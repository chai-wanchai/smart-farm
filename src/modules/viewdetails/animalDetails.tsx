import React, { Component } from 'react';
import { Container, Message, Header } from 'semantic-ui-react';
import FeedHistory from '../history/component/feedHistory';
interface IProp {
  barcode: string;
}
class AnimalDetails extends Component<IProp> {
  render() {
    return (
      <div>
        <Container>
          
        <Message>
        <Header as='h1'>ประวัติ</Header>
          <FeedHistory barcode={this.props.barcode} />
          </Message>
        </Container>
      </div>
    );
  }
}

export default AnimalDetails;