import React, { Component } from 'react';
import { Container, Message, Header, Item, Icon, Label, Image, Button } from 'semantic-ui-react';
import FeedHistory from '../history/component/feedHistory';
import SmartFarmApi from '../../api/SmartFarmApi';
import { IAnimalForm } from '../../models/SmartFarm';
interface IProp {
  barcode: string;
}
interface IState {
  data: IAnimalForm
}
class AnimalDetails extends Component<IProp, IState> {
  constructor(props) {
    super(props);
    this.state = {
      data: {
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
  }
  async componentDidMount() {
    const result = await SmartFarmApi.getAnimalByBarcode(this.props.barcode)
    this.setState({ data: result })
  }
  render() {
    const { data } = this.state
    const sexName = { MALE: 'ผู้', FEMALE: 'เมีย' }
    return (
      <div>
        <Container>
          <Header as='h1'>ข้อมูลสัตว์</Header>
          <Image.Group>
            {data.pictures.map((item) => {
              return <Image src={item.url} key={item.id} size="medium"></Image>
            })}
          </Image.Group>
          <Container>
            <br />
            <div>
              <b>ชื่อ</b> <span>{data.animalName}</span>
            </div>
            <div>
              <b>บาร์โค้ด</b> <span>{data.barcode}</span>
            </div>
            <div>
              <b>เพศ</b> <span>{sexName[data.sex]}</span>
            </div>
            <div>
              <b>ประเภทสัตว์</b> <span>{data.animalType.animalTypeName}</span>
            </div>
            <div>
              <b>วันที่เกิด</b> <span>{data.DOB}</span>
            </div>
            <div>
              <b>วันที่ซื้อ</b> <span>{data.buyDate}</span>
            </div>
            <div>
              <b>รายละเอียด</b> <span>{data.description}</span>
            </div>
            <Header as='h2'></Header>
          </Container>
          <Header as='h1'>ประวัติ</Header>
          <FeedHistory barcode={this.props.barcode} />

        </Container>
      </div>
    );
  }
}

export default AnimalDetails;