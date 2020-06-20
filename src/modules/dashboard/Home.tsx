import React, { Component } from 'react';
import AnimalForm from '../maintain/AnimalForm';
import { Card } from 'semantic-ui-react';
import styles from './Home.module.css'
import SmartFarmApi from '../../api/SmartFarmApi';
import BaseTable from '../../common/components/Table/baseTable';
import TableGroupAnimal from '../component/tableGroupAnimal';
class Home extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      eachAnimalType: [],
      totalAnimal: 0,
      totalAnimalType: 0
    }
  }
  async componentDidMount() {
    const data = await SmartFarmApi.getSummaryFarm()
    this.setState({ ...data })
  }
  render() {
    const { totalAnimalType, totalAnimal, eachAnimalType } = this.state;

    const dataTable = eachAnimalType.map(animalType => {
      let value = {
        AnimalType: animalType.animalType.animalTypeName,
        Total: animalType.countAnimalType
      }
      return value;
    })
    const columns = [{ order: 1, colName: 'ประเภท', colKey: 'AnimalType' }, { order: 1, colName: 'จำนวน', colKey: 'Total' }]
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
        <TableGroupAnimal />
      </div>
    );
  }
}

export default Home;