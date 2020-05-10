import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { IAnimalForm } from '../../../models/SmartFarm'
import SmartFarmApi from '../../../api/SmartFarmApi'
import BaseTable from '../../../common/components/Table/baseTable'

export default class AnimalHistoryTable extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      dataRow: [],
      columns: []
    }
    this.onClickHistory = this.onClickHistory.bind(this)
  }
  async componentDidMount() {
    const data = await SmartFarmApi.getAllAnimal()
    let dataRow = data.map((item, index) => {
      const row = {
        index: index + 1,
        barcode: item.barcode,
        animalName: item.animalName,
        animalTypeName: item.animalType.animalTypeName,
        sex: item.sex,
        operation: <>
          <Button color='green' onClick={this.onClickHistory} item={item}>บันทึกประวัติ</Button>
          <Button color='violet' onClick={this.onClickViewMore} item={item}>ดูข้อมูลสัตว์</Button>
        </>,

      }
      return row;
    })
    const columns = [
      { order: 0, colName: 'ลำดับ', colKey: 'index' },
      { order: 1, colName: 'บาร์โค้ด', colKey: 'barcode' },
      { order: 2, colName: 'ชื่อ', colKey: 'animalName' },
      { order: 3, colName: 'ประเภทสัตว์', colKey: 'animalTypeName' },
      { order: 3, colName: 'เพศ', colKey: 'sex' },
      { order: 4, colName: 'ดำเนินการ', colKey: 'operation' }
    ]
    this.setState({ dataRow: dataRow, columns: columns })
  }
  onClickHistory(e, data) {
    console.log(data)
  }
  onClickViewMore(e, data) {

  }
  render() {
    const { dataRow, columns } = this.state
    return (
      <>
        <BaseTable data={dataRow} columns={columns} />
      </>
    )
  }
}
