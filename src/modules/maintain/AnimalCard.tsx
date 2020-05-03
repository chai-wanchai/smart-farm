import React, { Component } from 'react'
import { Card, Image, Button, Modal, Container, Label } from 'semantic-ui-react'
import styles from './AnimalForm.module.css'
import * as _ from 'lodash';
import SmartFarmApi from '../../api/SmartFarmApi';
import Router from 'next/router';
// import moment from 'moment'
import AnimalForm from './AnimalForm';
import moment from 'moment';
interface IProp {
  data: any,
  mode: 'view' | 'edit'
}
export default class AnimalCard extends Component<IProp, any> {
  constructor(props) {
    super(props);
    this.state = {
      isOpenPopup: false,
      value: {
        barcode: '',
        animalTypeId: '',
        animalTypeOther: null,
        name: '',
        species: '',
        description: '',
        dob: null,
        pictures: []
      }

    }
    this.onDeleteAnimal = this.onDeleteAnimal.bind(this)
    this.onDeletePicture = this.onDeletePicture.bind(this)
    this.handlePopup = this.handlePopup.bind(this)
  }
  componentDidMount() {
    if (!_.isEmpty(this.props.data)) {
      this.setState({ value: this.props.data })
    }
  }
  async onDeletePicture(event, data) {
    const fileID = data.data.ID
    const result = await SmartFarmApi.deleteAnimalPicture(fileID)
    if (result.isSuccess) {
      const data = await SmartFarmApi.getAnimalByBarcode(this.state.value.barcode)
      data.pictures = data.pictures.map(item => {
        return { data: `/api/v1/animal/pictures/${data.barcode}/${item.ID}/${item.filename}`, ID: item.ID }
      })
      this.setState({ value: data })
    }
  }
  async onDeleteAnimal(event, data) {
    const result = await SmartFarmApi.deleteAnimal(this.state.value.barcode)
    if (result.isSuccess) {
      Router.reload()
    }
  }
  handlePopup() {
    this.setState({ isOpenPopup: !this.state.isOpenPopup })
  }

  render() {
    const { mode } = this.props
    const { isOpenPopup, value } = this.state
    return (
      <Card fluid>
        <Image.Group size="medium" className={styles['text-center']}>
          {value.pictures.map(item => {
            return <div className={styles['pic-div']} key={item.ID}>
              {mode === 'edit' ?
                <Button type="button"
                  icon="window close"
                  className={styles['pic-delete-btn']}
                  data={item}
                  onClick={this.onDeletePicture}></Button> : null}
              <Image src={item.data} alt={item.ID} rounded />
            </div>
          })}
        </Image.Group>
        <Card.Content>
          <Card.Header>
            <Label as='a' color='blue' tag>
              Barcode
              <Label.Detail>{value.barcode}</Label.Detail>
            </Label>
            <Label as='a' color='teal' image>
              <img src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
              ชื่อ
              <Label.Detail>{value.name}</Label.Detail>
            </Label>
            <Label color="yellow" >
              อายุ {moment(value.dob).fromNow()}
            </Label>
            <Label>
              เพศ {value.sex}
            </Label>
          </Card.Header>

          <Card.Description>

            <p>รายละเอียด : {value.description}</p>
          </Card.Description>
          {mode === 'edit' ?
            <Card.Content textAlign='center'>
              <Button color="yellow" onClick={this.handlePopup}>แก้ไข</Button>
              <Button color="red" onClick={this.onDeleteAnimal}>ลบ</Button>
            </Card.Content> : null
          }
          <Modal open={isOpenPopup} onClose={this.handlePopup} closeIcon>
            <Modal.Header>แก้ไขข้อมูลสัตว์</Modal.Header>
            <Modal.Description>
              <Container>
                <AnimalForm mode="edit" value={value} />
              </Container>
            </Modal.Description>
          </Modal>
        </Card.Content>
      </Card>
    )
  }
}
