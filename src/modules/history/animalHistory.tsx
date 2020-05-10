import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { IAnimalForm } from '../../models/SmartFarm'
import SmartFarmApi from '../../api/SmartFarmApi'
import BaseTable from '../../common/components/Table/baseTable'
import HistoryForm, { PopupHistoryForm } from './component/historyForm'
import AnimalHistoryTable from './component/historyTable'
import FeedHistory from './component/feedHistory'
interface IState {
  data: Array<IAnimalForm>
}
interface IProps {
  mode: 'view' | 'edit' | 'table'
}
export default class AnimalHistory extends Component<IProps, any> {
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
        <AnimalHistoryTable />
      </Container>
    )
  }
}
