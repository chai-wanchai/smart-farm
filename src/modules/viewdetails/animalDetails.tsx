import React, { Component } from 'react';
import { Container, Message, Header, Item, Icon, Label, Image, Button } from 'semantic-ui-react';
import FeedHistory from '../history/component/feedHistory';
interface IProp {
  barcode: string;
}
const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
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