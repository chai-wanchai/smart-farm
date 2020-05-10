import React, { Component } from 'react';
import { Feed, Image } from 'semantic-ui-react';
import { IAnimalHistory } from '../../../models/AnimalHistory';
import moment from 'moment';
import SmartFarmApi from '../../../api/SmartFarmApi';
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
      data: [
        { title: 'rrr', createdAt: '2018-01-30', pictures: [], description: 'sddd', date: '2018-01-30' }
      ]
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
                  <Feed.User>{item.title}</Feed.User> วันที่ {item.date}
                  <Feed.Date>{moment(item.date).fromNow()}</Feed.Date>
                </Feed.Summary>
                <Feed.Summary>
                  {item.description}
                </Feed.Summary>
                <Feed.Extra images>
                  {item.pictures.map((pic, index) => {
                    return <>
                      <Image src={pic.url} size='small' key={`${index}-${pic.id}`} />
                    </>
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