import React, { Component } from 'react';
import { Feed, Image } from 'semantic-ui-react';
import { IAnimalHistory } from '../../../models/AnimalHistory';
import moment from 'moment';
import 'moment/locale/th';
import SmartFarmApi from '../../../api/SmartFarmApi';

moment.locale('th')
interface IProps {
  barcode: string;
}
interface IState {
  data: IAnimalHistory[]
}
class FeedHistory extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  async componentDidMount() {
    const data = await SmartFarmApi.getAnimalHistoryByBarcode(this.props.barcode)
    this.setState({ data: data })
  }
  render() {
    const { data } = this.state
    return (
      <div>
        <Feed>
          {data.map((item, index) => {
            return <Feed.Event key={index}>
              <Feed.Label>
                <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>{item.title}</Feed.User>
                  <Feed.Date>วันที่ {moment(item.date).format('DD MMM YYYY')} ({moment(item.date).fromNow()})</Feed.Date>
                </Feed.Summary>
                <Feed.Summary>
                  <p style={{ fontWeight: 'normal' }}>{item.description}</p>
                </Feed.Summary>
                <Feed.Extra images>
                  {item.pictures.map((pic, index) => {
                    return <div key={`${index}-${pic.id}`} >
                      <Image src={pic.url} size='small' />
                    </div>
                  })}
                </Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          })}

        </Feed>
      </div>
    );
  }
}

export default FeedHistory;