import React, { Component } from 'react';
import AnimalForm from '../maintain/AnimalForm';
import { Card } from 'semantic-ui-react';
import styles from './Home.module.css'
class Home extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      total: {
        AllAmimal: 0,
        EachAnimalType: 0
      }
    }
  }
  render() {
    const { total } = this.state;
    return (
      <div>
        <Card.Group>
          <Card className={styles['bg-gradient-disco-club']}>
            <Card.Content>
              <Card.Header color="white">{total.AllAmimal}</Card.Header>
              <Card.Description as="p">จำนวนสัตว์ทั้งหมด</Card.Description>
            </Card.Content>
          </Card>
          <Card className={styles['bg-gradient-aqua-spray']}>
            <Card.Content>
              <Card.Header>{total.EachAnimalType}</Card.Header>
              <Card.Description>ประเภทสัตว์ทั้งหมด</Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>

        <AnimalForm />
      </div>
    );
  }
}

export default Home;