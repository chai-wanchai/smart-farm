import React, { Component } from 'react'
import AnimalCard from './AnimalCard';
import SmartFarmApi from '../../api/SmartFarmApi';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
export default class ListAnimal extends Component<any, any> {
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
        const buff = new Buffer(item.base64.data)
        return { data: buff.toString(), ID: item.ID }
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
    return (
      <div>
        <Dimmer active={isLoading} inverted>
          <Loader size='massive' active={isLoading}>Loading</Loader>
        </Dimmer>
        {data.map(item => {
          return <AnimalCard data={item} mode="edit" />
        })}

      </div>
    )
  }
}
