import React, { Component, RefObject } from 'react';
import { Card, Form, Input, Image, Button, Icon, Container, Divider } from 'semantic-ui-react';
import * as _ from 'lodash';
import { DateInput } from 'semantic-ui-calendar-react';
import styles from './AnimalForm.module.css'
import SmartFarmApi from '../../api/SmartFarmApi';
import Resizer from 'react-image-file-resizer';
import moment from 'moment';
import 'moment/locale/th';
import Router from 'next/router';
import Swal from 'sweetalert2'
import * as Popup from '../../common/components/Popup/Popup';
import { ErrorHandle } from '../../common/Errorhandle';
import { IAnimalForm } from '../../models/SmartFarm';


interface IProp {
  value?: IAnimalForm,
  mode?: 'create' | 'edit'
}
interface IState {
  data: any,
  value: IAnimalForm,
  mode: 'create' | 'edit'
}
class AnimalForm extends Component<IProp, IState> {
  refsFileUpload: RefObject<any>;
  initState: IState = {
    mode: 'create',
    data: {
      formDetails: [],
      animalType: [],
      sex: [{ sex: 'MALE', sexName: 'เพศผู้' }, { sex: 'FEMALE', sexName: 'เพศเมีย' }, { sex: 'NULL', sexName: 'ไม่ระบุ' }]
    },
    value: {
      barcode: "",
      animalName: "",
      sex: "",
      DOB: "",
      description: "",
      isActive: true,
      father: "",
      mother: "",
      buyDate: "",
      animalTypeId: 0,
      pictures: [],
      animalType: {
        id: 0,
        animalTypeName: "",
        description: null,
        animalSpeciesName: null
      },
      animalDetails: []
    }
  }
  constructor(props) {
    super(props);
    this.state = this.initState
    this.handleChange = this.handleChange.bind(this)
    this.handleUploadFileChange = this.handleUploadFileChange.bind(this)
    this.onReset = this.onReset.bind(this)
    this.onDeletePicture = this.onDeletePicture.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onClickAddMoreDetails = this.onClickAddMoreDetails.bind(this)
    this.refsFileUpload = React.createRef();
  }
  async fetchStaticData() {
    let StateData = this.state.data
    const animalsType = await SmartFarmApi.getAnimalsType()
    const formDetails = await SmartFarmApi.getFormDetails()
    animalsType.push({ animalTypeId: 0, animalTypeName: 'อื่นๆ' })
    formDetails.push({ detailId: 0, detailTypeName: "อื่นๆ", description: "" })
    StateData.animalType = animalsType
    StateData.formDetails = formDetails
    return StateData
  }
  handleChange(e, data) {
    let key = data.name;
    let value = data.value;
    let stateValue = _.clone(this.state.value);
    if (key.includes('detail')) {
      const index = parseInt(key.split('-')[1])
      key = key.split('-')[0].split(':')[1]
      let findKey: any = Object.assign({}, _.find(this.state.data.formDetails, { detailId: data.ids || value }))
      if (!_.isEmpty(findKey)) {
        if (key === 'detailId') {
          stateValue.animalDetails[index] = findKey
        } else {
          stateValue.animalDetails[index][key] = value
        }
      } else {
        stateValue.animalDetails[index][key] = value
      }
    } else {
      stateValue[key] = value
    }

    this.setState({ value: stateValue });
  }
  async handleSubmit(e, data) {
    Popup.Loading()
    try {
      let value = this.state.value
      if (moment(value.DOB).isValid()) {
        value.DOB = moment(value.DOB).format()
      } else {
        value.DOB = moment().format()
      }
      if (moment(value.buyDate).isValid()) {
        value.buyDate = moment(value.buyDate).format()
      } else {
        value.buyDate = moment().format()
      }
      let result = null
      if (this.props.mode === 'create') {
        result = await SmartFarmApi.saveAnimal(value)
        Router.push('/home')
      } else {
        value.pictures = _.reduce(value.pictures, (dataResult: any, item) => {
          if (item.fileName) {
            dataResult.push(item)
          }
          return dataResult
        }, [])
        result = await SmartFarmApi.updateAnimalInfo(value)
        Router.push('/maintain/animal/edit')
      }
      Popup.Close()
      //Router.reload()
    } catch (error) {
      console.log(error)
      Popup.ShowError(JSON.stringify(error))
    }

  }
  handleUploadFileChange(e) {
    _.forEach(e.target.files, (file) => {
      const fileName = file.name
      let value = this.state.value;
      Resizer.imageFileResizer(file, 500, 500, 'JPEG', 100, 0, uri => {
        const imgMeta = { fileName: fileName, data: uri, pictureType: 'animal' }
        value.pictures.push(imgMeta)
        this.setState({ value: value });
      }, 'base64')

      /*------------ Not Resize Img --------------*/
      // let reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onloadend = () => {
      //   const imgMeta = { filename: fileName, data: reader.result, meta: file }
      //   value.picture.push(imgMeta)
      //   this.setState({ value: value });
      // }
    })

  }
  onDeletePicture(event, data) {
    console.log(data);
    const delFile = data.data
    let value = this.state.value
    if (delFile.id) {
      SmartFarmApi.deleteAnimalPicture(delFile.id)
    }
    value.pictures = _.reduce(value.pictures, (result: any, valueItem) => {
      if (valueItem.fileName !== delFile.fileName || valueItem.id !== delFile.id) {
        result.push(valueItem)
      }
      return result
    }, []);
    this.setState({ value: value })
  }
  onReset() {
    let stateInint: IState = { ...this.state }
    if (this.props.mode === 'create') {
      stateInint = { ...this.initState }
      stateInint.value.pictures = []
      stateInint.value.animalDetails = []
    } else {
      stateInint.value = this.props.value as IAnimalForm
      stateInint.mode = this.props.mode as any
    }
    // stateInint.data = this.state.data
    this.setState({ ...stateInint })
  }
  onClickAddMoreDetails(e, Eventdata) {
    let valueState = this.state.value
    valueState.animalDetails.push({ detailId: 0, detailTypeName: "อื่นๆ", description: "", value: "" })
    this.setState({ value: valueState })
  }
  async componentDidMount() {
    let dataMaster = await this.fetchStaticData()
    if (this.props.value) {
      let value = this.props.value
      value.animalDetails = value.animalDetails.map(item => {
        const detailTypename: any = _.find(dataMaster.formDetails, { detailId: item.detailTypeId })
        item.detailTypeName = detailTypename ? detailTypename.detailTypeName : ''
        return item
      })
      this.setState({ value: value, mode: 'edit', data: dataMaster })
    }

  }
  render() {
    const { value, data, mode } = this.state
    console.log(this.state);
    let animalType = data.animalType.map(item => { return { text: item.animalTypeName, value: item.animalTypeId } })
    let sex = data.sex.map(item => { return { text: item.sexName, value: item.sex } })
    let formDetails = data.formDetails.map(item => { return { text: item.detailTypeName, value: item.detailId } })
    return (
      <div style={{ padding: '1rem' }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              icon="tags"
              iconPosition='left'
              placeholder="Barcode"
              label="Barcode"
              value={value.barcode}
              name="barcode"
              readOnly={mode === 'edit'}
              onChange={this.handleChange}>
            </Form.Input>
            <Form.Input
              placeholder="ชื่อสัตว์"
              label="ชื่อสัตว์"
              width="16"
              value={value.animalName}
              name='animalName'
              onChange={this.handleChange}>
            </Form.Input>
          </Form.Group>
          <Form.Group>
            <Form.Select
              label="ชนิดสัตว์"
              options={animalType}
              placeholder="ชนิดสัตว์"
              value={value.animalTypeId}
              onChange={this.handleChange}
              name="animalTypeId" />
            {value.animalTypeId === 0 ?
              <Form.Input
                placeholder="ระบุชนิดสัตว์"
                label="ระบุชนิดสัตว์"
                value={value.animalTypeOther}
                name="animalTypeOther"
                onChange={this.handleChange}>
              </Form.Input> : null}
            <Form.Select
              placeholder="เพศ"
              label="เพศ"
              options={sex}
              value={value.sex}
              name='sex'
              onChange={this.handleChange}>
            </Form.Select>
            <Form.Input
              placeholder="พ่อพันธุ์"
              label="พ่อพันธุ์"
              value={value.father}
              name='father'
              onChange={this.handleChange}>
            </Form.Input>
            <Form.Input
              placeholder="แม่พันธุ์"
              label="แม่พันธุ์"
              value={value.mother}
              name='mother'
              onChange={this.handleChange}>
            </Form.Input>
          </Form.Group>
          <Form.Group>
            <DateInput
              name="DOB"
              placeholder="วันที่เกิด"
              label="วันที่เกิด"
              value={value.DOB}
              dateFormat="DD-MM-YYYY"
              iconPosition="left"
              onChange={this.handleChange}
              localization='th'
              duration={10}
            />
            <DateInput
              name="buyDate"
              placeholder="วันที่ซื้อเข้าฟาร์ม"
              label="วันที่ซื้อเข้าฟาร์ม"
              value={value.buyDate}
              dateFormat="DD-MM-YYYY"
              iconPosition="left"
              onChange={this.handleChange}
              localization='th'
              duration={10}
            />
          </Form.Group>
          <Form.Field>
            <Button
              color='blue'
              size='mini'
              type="button"
              content="เพิ่มข้อมูลอื่นๆ"
              labelPosition="left"
              icon="edit"
              onClick={this.onClickAddMoreDetails}
            />
          </Form.Field>
          {value.animalDetails.map((item, index) => {
            return <div key={index}>
              <Form.Group key={index}>
                <Form.Select
                  placeholder="ประเภทข้อมูล"
                  label="ประเภทข้อมูล"
                  options={formDetails}
                  value={item.detailTypeId}
                  key={`detail:detailId-${index}`}
                  name={`detail:detailId-${index}`}
                  onChange={(this.handleChange)}>
                </Form.Select>
                {item.detailId === 0 ?
                  <Form.Input
                    placeholder="ระบุประเภทข้อมูล"
                    label="ระบุประเภทข้อมูล"
                    value={value.animalTypeOther}
                    ids={item.detailId}
                    key={`detail:detailTypeName-${index}`}
                    name={`detail:detailTypeName-${index}`}
                    onChange={this.handleChange}>
                  </Form.Input> : null}
                <Form.TextArea
                  placeholder={item.detailTypeName}
                  label={item.detailTypeName}
                  value={item.value}
                  ids={item.detailId}
                  key={`detail:value-${index}`}
                  name={`detail:value-${index}`}
                  onChange={this.handleChange}>
                </Form.TextArea>
              </Form.Group>
              <Divider />
            </div>
          })}
          <Form.TextArea
            placeholder="รายละเอียด"
            label="รายละเอียด"
            name="description"
            value={value.description}
            onChange={this.handleChange}>
          </Form.TextArea>

          <Form.Field>
            <Button
              type="button"
              content="เลือกรูปภาพ"
              labelPosition="left"
              icon="upload"
              onClick={() => this.refsFileUpload.current.click()}
            />
            <input
              ref={this.refsFileUpload}
              name='picture'
              type="file"
              multiple
              hidden
              onChange={this.handleUploadFileChange}
            />
          </Form.Field>

          <Image.Group size="medium" className={styles['text-center']}>
            {value.pictures.map(item => {
              const showDeletePic = mode === 'edit' ?
                { as: 'a', color: 'red', corner: 'right', data: item, icon: 'window close', onClick: this.onDeletePicture } : null
              return <div className={styles['pic-div']} key={item.id}>
                <Image src={item.data} alt={item.id} rounded label={showDeletePic} />
              </div>
            })}
          </Image.Group>

          <Form.Group className={styles['center-div']}>
            <Form.Button color="green" type="submit">บันทึกข้อมูล</Form.Button>
            <Form.Button color="red" type="reset" onClick={this.onReset}>ล้างข้อมูล</Form.Button>
          </Form.Group>

        </Form>
      </div>
    );
  }
}

export default AnimalForm;