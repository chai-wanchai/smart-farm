import React, { Component, RefObject } from 'react';
import { Card, Form, Input, Image, Button, Icon, Container } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/th';
import * as _ from 'lodash';
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';
import styles from './AnimalForm.module.css'
import SmartFarmApi from '../../api/SmartFarmApi';
import Resizer from 'react-image-file-resizer';
class AnimalForm extends Component<any, any> {
  refsFileUpload: RefObject<any>;
  initState = {
    mode: 'create',
    data: {
      animalType: [
        { animalTypeId: 1, animalType: 'วัว' },
        { animalTypeId: 2, animalType: 'แกะ' },
        { animalTypeId: 0, animalType: 'อื่นๆ' }
      ],
      sex: [{ sex: 'MALE', sexName: 'เพศผู้' }, { sex: 'FEMALE', sexName: 'เพศเมีย' }, { sex: 'NULL', sexName: 'ไม่ระบุ' }]
    },
    value: {
      barcode: '',
      animalType: '',
      animalTypeOther: null,
      name: '',
      species: '',
      discription: '',
      dob: null,
      sex: '',
      picture: []
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
    this.refsFileUpload = React.createRef();
  }
  handleChange(e, data) {
    const key = data.name;
    const value = data.value;
    let stateValue = { ...this.state.value, [key]: value };
    this.setState({ value: stateValue });
  }
  async handleSubmit(e, data) {
    const value = this.state.value  
    const result = await SmartFarmApi.saveAnimal(value)
    console.log(result);



  }
  handleUploadFileChange(e) {
    _.forEach(e.target.files, (file) => {
      const fileName = file.name
      let value = this.state.value;
      Resizer.imageFileResizer(file, 500, 500, 'JPEG', 100, 0, uri => {
        const imgMeta = { filename: fileName, data: uri }
        value.picture.push(imgMeta)
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
    const filename = data.data.filename
    let value = this.state.value
    value.picture = _.reduce(value.picture, (result, valueItem) => {
      if (valueItem.filename !== filename) {
        result.push(valueItem)
      }
      return result
    }, []);
    this.setState({ value: value })
  }
  onReset() {
    let stateInint = this.initState
    stateInint.value.picture = []
    this.setState({ ...stateInint })
  }
  componentDidMount() {

  }
  render() {
    const { value, data, mode } = this.state
    let animalType = data.animalType.map(item => { return { text: item.animalType, value: item.animalTypeId } })
    let sex = data.sex.map(item => { return { text: item.sexName, value: item.sex } })
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              icon="tags"
              iconPosition='left'
              placeholder="Barcode"
              label="Barcode"
              value={value.barcode}
              name="barcode"
              onChange={this.handleChange}>
            </Form.Input>
            <Form.Input
              placeholder="ชื่อสัตว์"
              label="ชื่อสัตว์"
              width="16"
              value={value.name}
              name='name'
              onChange={this.handleChange}>
            </Form.Input>
          </Form.Group>
          <Form.Group>
            <Form.Select
              label="ชนิดสัตว์"
              options={animalType}
              placeholder="ชนิดสัตว์"
              value={value.animalType}
              onChange={this.handleChange}
              name="animalType" />
            {value.animalType === 0 ?
              <Form.Input
                placeholder="ระบุชนิดสัตว์"
                label="ระบุชนิดสัตว์"
                value={value.animalTypeOther}
                name="animalTypeOther"
                onChange={this.handleChange}>
              </Form.Input> : null}
            <Form.Input
              placeholder="พันธุ์สัตว์"
              label="พันธุ์สัตว์"
              value={value.name}
              name='species'
              onChange={this.handleChange}>
            </Form.Input>
            <Form.Select
              placeholder="เพศ"
              label="เพศ"
              options={sex}
              value={value.sex}
              name='sex'
              onChange={this.handleChange}>
            </Form.Select>
          </Form.Group>
          <Form.Field>
            <DateInput
              name="dob"
              placeholder="วันที่เกิด"
              label="วันที่เกิด"
              value={value.dob}
              iconPosition="left"
              onChange={this.handleChange}
              localization='th'
            />
          </Form.Field>
          <Form.TextArea
            placeholder="รายละเอียด"
            label="รายละเอียด"
            name="discription"
            value={value.discription}
            onChange={this.handleChange}>
          </Form.TextArea>
          {mode === 'create' ?
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
            </Form.Field> : null
          }

          <Image.Group size="medium" className={styles['text-center']}>
            {value.picture.map(item => {
              return <div className={styles['pic-div']} key={item.filename}>
                <Button type="button"
                  icon="window close"
                  className={styles['pic-delete-btn']}
                  data={item}
                  onClick={this.onDeletePicture}></Button>
                <Image src={item.data} alt={item.filename} rounded />
              </div>
            })}
          </Image.Group>

          <Form.Group className={styles['center-div']}>
            <Form.Button color="green" icon="saves" type="submit">บันทึกข้อมูล</Form.Button>
            <Form.Button color="red" type="reset" onClick={this.onReset}>ล้างข้อมูล</Form.Button>
          </Form.Group>

        </Form>
      </div>
    );
  }
}

export default AnimalForm;