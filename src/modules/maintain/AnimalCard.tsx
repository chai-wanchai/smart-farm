import React, { Component } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import styles from './AnimalForm.module.css'
import * as _ from 'lodash';
import moment from 'moment'
import AnimalForm from './AnimalForm';
interface IProp {
  data: any
}
export default class AnimalCard extends Component<IProp, any> {
  constructor(props) {
    super(props);
    this.state = {
      barcode: '',
      animalType: '',
      animalTypeOther: null,
      name: '',
      species: '',
      discription: '',
      dob: null,
      picture: []
    }
  }
  componentDidMount() {
    if (!_.isEmpty(this.props.data)) {
      this.setState({ ...this.props.data })
    }

  }
  onDeletePicture(event, data) {
    const filename = data.data.filename
    let value = { ...this.state }
    value.picture = _.reduce(value.picture, (result:any, valueItem) => {
      if (valueItem.filename !== filename) {
        result.push(valueItem)
      }
      return result
    }, []);
    this.setState({ ...value })
  }
  render() {
    return (
      <Card fluid>
        <Image.Group size="medium" className={styles['text-center']}>
          {this.state.picture.map(item => {
            return <div className={styles['pic-div']} key={item.filename}>
              <Button type="button"
                icon="window close"
                className={styles['pic-delete-btn']}
                data={item}
                onClick={this.onDeletePicture}></Button>
              <Image src={item.data} alt={item.filename} rounded />
            </div>
          })}
        </Image.Group>
        <Card.Content>
          <Card.Header>{this.state.name}</Card.Header>
          <Card.Meta>เกิดวันที่ {moment(this.state.dob).format('YYYY-MM-DD')} อายุ {moment(this.state.dob).fromNow()} ปี</Card.Meta>
          <Card.Description>
            {/* <AnimalForm/> */}
          </Card.Description>
          <Card.Content>
            <Button color="yellow">แก้ไข</Button>
          </Card.Content>
        </Card.Content>
      </Card>
    )
  }
}
