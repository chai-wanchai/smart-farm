import React, { Component } from 'react'
import { Card, Image, Button, Modal, Container, Label, Item } from 'semantic-ui-react'
import styles from './AnimalForm.module.css'
import * as _ from 'lodash';
import SmartFarmApi from '../../api/SmartFarmApi';
import Router from 'next/router';
// import moment from 'moment'
import AnimalForm from './AnimalForm';
import moment from 'moment';
import { IAnimalForm } from '../../models/SmartFarm';
interface IProp {
  data: any,
  mode: 'view' | 'edit'
}
interface IState {
  isOpenPopup: boolean
  value: IAnimalForm
}
export default class AnimalCard extends Component<IProp, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isOpenPopup: false,
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
    const fileID = data.data.id
    const result = await SmartFarmApi.deleteAnimalPicture(fileID)
    if (result.isSuccess) {
      const data = await SmartFarmApi.getAnimalByBarcode(this.state.value.barcode)
      data.pictures = data.pictures.map(item => {
        return { data: `/api/v1/animal/pictures/${data.barcode}/${item.id}/${item.fileName}`, id: item.id }
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
    const sexName = { MALE: "เพศผู้", FEMALE: "เพศเมีย" }
    return (
      <Item>
        <Item.Content>
          <Image.Group size="medium" className={styles['text-center']}>
            {value.pictures.map(item => {
              const showDeletePic = mode === 'edit' ?
                { as: 'a', color: 'red', corner: 'right', data: item, icon: 'window close', onClick: this.onDeletePicture } : null
              return <div className={styles['pic-div']} key={item.id}>
                <Image src={item.data} alt={item.id} rounded label={showDeletePic} />
              </div>
            })}
          </Image.Group>
        </Item.Content>
        <Item.Content>
          <Item.Header as='a' href={`/animal/info/${value.barcode}`}>{value.animalName}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{value.barcode}</span>
          </Item.Meta>
          <Item.Description>
            {value.description}
          </Item.Description>
          <Item.Extra>
            <Label color='red' horizontal> อายุ {moment(value.DOB).fromNow()}</Label>
            <Label color='purple' horizontal>{sexName[value.sex]}</Label>
          </Item.Extra>
          {mode === 'edit' ?
            <Item.Extra>
              <Button color="yellow" onClick={this.handlePopup}>แก้ไข</Button>
              <Button color="red" onClick={this.onDeleteAnimal}>ลบ</Button>
            </Item.Extra> : null
          }
          <Modal open={isOpenPopup} onClose={this.handlePopup} closeIcon>
            <Modal.Header>แก้ไขข้อมูลสัตว์</Modal.Header>
            <Modal.Description>
              <Container>
                <AnimalForm mode="edit" value={value} />
              </Container>
            </Modal.Description>
          </Modal>
        </Item.Content>
      </Item>
    )
  }
}
