import React, { Component } from 'react'
import AnimalCard from './AnimalCard';
import SmartFarmApi from '../../api/SmartFarmApi';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
interface IProps {
  mode: 'view' | 'edit'
}
export default class ListAnimal extends Component<IProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false
    }
  }
  async fetchData() {
    this.setState({ isLoading: true })
    const data = await SmartFarmApi.getAllAnimal()
    let result = data.map((animal) => {
      animal.pictures = animal.pictures.map(item => {
        return { data: `/api/v1/animal/pictures/${animal.barcode}/${item.ID}/${item.filename}`, ID: item.ID }
      })
      return animal
    })
    return result
  }
  async componentDidMount() {
    const result = await this.fetchData()
    this.setState({ data: result, isLoading: false })
  }
  render() {
    const { data, isLoading } = this.state
    const { mode } = this.props
    return (
      <div>
        <Dimmer active={isLoading} inverted>
          <Loader size='massive' active={isLoading}>กำลังโหลดข้อมูล....</Loader>
        </Dimmer>
        {data.map(item => {
          return <AnimalCard data={item} mode={mode || 'view'} />
        })}

      </div>
    )
  }
}
