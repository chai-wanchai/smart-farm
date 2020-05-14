import React, { Component } from 'react';
import { Feed, Image } from 'semantic-ui-react';
import { IAnimalHistory } from '../../../models/AnimalHistory';
import moment from 'moment';
import 'moment/locale/th';
import SmartFarmApi from '../../../api/SmartFarmApi';
import BaseTable from '../../../common/components/Table/baseTable';

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
    let response = await SmartFarmApi.getAnimalHistoryByBarcode(this.props.barcode)
    let data = response.map(item => {
      item.date = `วันที่ ${moment(item.date).format('DD MMM YYYY')} (${moment(item.date).fromNow()})`
      item.picComp = item.pictures.map((pic, index) => {
        return <div key={`${index}-${pic.id}`} >
          <Image src={pic.url} size='small' />
        </div>
      })
      item.descriptionShow = <p style={{ fontWeight: 'normal', whiteSpace: 'break-spaces' }}>{item.description}</p>
      return item;
    })
    this.setState({ data: data })
  }
  render() {
    const { data } = this.state
    const columns = [
      { order: 2, colName: 'หัวข้อ', colKey: 'title' },
      { order: 3, colName: 'รายละเอียด', colKey: 'descriptionShow' },
      { order: 1, colName: 'วันที่', colKey: 'date' },
      { order: 4, colName: 'รูป', colKey: 'picComp' },
    ]
    return (
      <div>
        <BaseTable data={data} columns={columns} />      
      </div>
    );
  }
}

export default FeedHistory;