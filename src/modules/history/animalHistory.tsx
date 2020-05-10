import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { IAnimalForm } from '../../models/SmartFarm'
import SmartFarmApi from '../../api/SmartFarmApi'
import BaseTable from '../../common/components/Table/baseTable'
import HistoryForm from './component/historyForm'
import AnimalHistoryTable from './component/historyTable'
import FeedHistory from './component/feedHistory'
interface IState {
  data: Array<IAnimalForm>
}
interface IProps {
  mode: 'view' | 'edit' | 'table'
}
export default class AnimalHistory extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      dataRow: [],
      columns: []
    }
  }

  render() {
    return (
      <Container>
        {this.props.mode === 'table' ? <AnimalHistoryTable /> : null}
         <FeedHistory barcode="11111"/>
        <HistoryForm barcode="11111" animalName="bbb"/>
       
      </Container>
    )
  }
}
