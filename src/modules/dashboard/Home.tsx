import React, { Component } from 'react';
import AnimalForm from '../maintain/AnimalForm';
import { Card } from 'semantic-ui-react';
import styles from './Home.module.css'
import SmartFarmApi from '../../api/SmartFarmApi';
import BaseTable from '../../common/components/Table/baseTable';
class Home extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      "eachAnimalType": [
        {
          "AnimalTypeId": 1,
          "CountAnimalType": "2",
          "AnimalType": {
            "AnimalTypeName": "วัว",
            "Description": null,
            "AnimalSpeciesName": null
          }
        },
        {
          "AnimalTypeId": 4,
          "CountAnimalType": "2",
          "AnimalType": {
            "AnimalTypeName": "ปลา",
            "Description": null,
            "AnimalSpeciesName": null
          }
        },
        {
          "AnimalTypeId": 5,
          "CountAnimalType": "3",
          "AnimalType": {
            "AnimalTypeName": "แกะ",
            "Description": null,
            "AnimalSpeciesName": null
          }
        }
      ],
      "totalAnimal": 7,
      "totalAnimalType": 3
    }
  }
  async componentDidMount() {
    const data = await SmartFarmApi.getSummaryFarm()
    this.setState({ data })
  }
  render() {
    const { totalAnimalType, totalAnimal } = this.state;
    const dataTable = this.state.eachAnimalType.map(animalType => {
      let value = {
        AnimalType: animalType.AnimalType.AnimalTypeName,
        Total: animalType.CountAnimalType
      }
      return value;
    })
    const columns = [{ order: 1, colName: 'ประเภท', colKey: 'AnimalType' },{ order: 1, colName: 'จำนวน', colKey: 'Total' }]
    return (
      <div>
        <Card.Group textAlign="center">
          <Card className={styles['bg-gradient-disco-club']}>
            <Card.Content>
              <Card.Header color="white">{totalAnimal}</Card.Header>
              <Card.Description as="p">จำนวนสัตว์ทั้งหมด</Card.Description>
            </Card.Content>
          </Card>
          <Card className={styles['bg-gradient-aqua-spray']}>
            <Card.Content>
              <Card.Header>{totalAnimalType}</Card.Header>
              <Card.Description>ประเภทสัตว์ทั้งหมด</Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
        <BaseTable data={dataTable} title={"ประเภทสัตว์แต่ละประเภท"} columns={columns} />
      </div>
    );
  }
}

export default Home;