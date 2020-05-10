import React, { Component, RefObject } from 'react'
import { Container, Step, Icon, Form } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import AddPicture from '../../../common/components/AddPicture/AddPicture'
import { IAnimalPicture } from '../../../models/SmartFarm'
import SmartFarmApi from '../../../api/SmartFarmApi'
import moment from 'moment'
interface IState {
  value: {
    pictures: IAnimalPicture[],
    barcode: string
    animalName: string
    title: string
    date: string
    description: string
  }
}
interface IProps {
  barcode: string
  animalName: string
}
export default class HistoryForm extends Component<IProps, IState> {
  refsPicture: RefObject<any>;
  constructor(props) {
    super(props);
    this.state = {
      value: {
        pictures: [],
        barcode: '',
        animalName: '',
        title: '',
        date: '',
        description: '',
      }
    }
    this.refsPicture = React.createRef();
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
    const { barcode, animalName } = this.props
    let stateValue = this.state.value
    stateValue.barcode = barcode
    stateValue.animalName = animalName
    this.setState({ value: stateValue })
  }
  handleChange(e, data) {
    const key = data.name;
    const value = data.value;
    this.setState({ value: { ...this.state.value, [key]: value } });
  }

  async onSubmit() {
    const pictures = this.refsPicture.current.getImage()
    let stateValue = this.state.value
    stateValue.pictures = pictures
    console.log(stateValue.date)
    if (moment(stateValue.date).isValid()) {
      stateValue.date = moment(stateValue.date).format()
    }else{
      stateValue.date = moment().format()
    }
    const result = await SmartFarmApi.createAnimalHistory(stateValue)
    console.log(result)
  }
  render() {
    const { value } = this.state
    return (
      <div>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input width='6' label='Barcode' placeholder='Barcode' readOnly value={value.barcode} />
            <Form.Input fluid label='ชื่อสัตว์' placeholder='ชื่อสัตว์' value={value.animalName} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Input width="8" label='หัวข้อ' placeholder='หัวข้อ' value={value.title} name='title' onChange={this.handleChange} />
            <DateInput
              name="date"
              placeholder="วันที่"
              label="วันที่"
              value={value.date}
              dateFormat="DD-MM-YYYY"
              iconPosition="left"
              onChange={this.handleChange}
              localization='th'
              duration={10}
            />
          </Form.Group>
          <Form.TextArea label='ประวัติ' placeholder='บันทึกประวัติ' name='description' onChange={this.handleChange} />
          <AddPicture mode='edit' pictureType="history" ref={this.refsPicture} />
          <Form.Button color="green" onClick={this.onSubmit}>บันทึก</Form.Button>
        </Form>
      </div>
    )
  }
}
