import React, { Component } from 'react'
import AnimalCard from './AnimalCard';

export default class ListAnimal extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          barcode: '142536',
          animalType: 'วัว',
          animalTypeOther: null,
          name: 'ก๋วยจั๊บ',
          species: 'เพศผู้',
          discription: '',
          dob: null,
          picture: []
        },
        {
          barcode: '1477785',
          animalType: 'ปลา',
          animalTypeOther: null,
          name: 'ทอง',
          species: '',
          discription: '',
          dob: null,
          picture: []
        }
      ]
    }
  }
  render() {
    return (
      <div>
        {this.state.data.map(item => {
          return <AnimalCard data={item} />
        })}
      </div>
    )
  }
}
