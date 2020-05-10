import React, { Component } from 'react'
import { Table, Icon, StrictTableProps } from 'semantic-ui-react'

interface IDataRow {
  [key: string]: any
}
interface IColumn {
  order?: number,
  colName?: string,
  colKey: string
}
interface IProps {
  columns?: Array<IColumn>
  data: Array<IDataRow>,
  title?: string
  option?: StrictTableProps
}

export default class BaseTable extends Component<IProps, any> {

  render() {
    let renderColumn: any = []
    let renderData: any = []
    if (this.props.columns) {
      renderColumn = this.props.columns
    } else {
      renderColumn = Object.keys(this.props.data[0] || {}).map((key, index) => {
        return { colName: key, colKey: key, order: index }
      })
    }
    renderData = this.props.data.map((item, key) => {
      const eachCol = renderColumn.map((col, index) => {
        let val: any = null
        // if (typeof item[col.colKey] === "object") {
        //   val = JSON.stringify(item[col.colKey])
        // } else {
          val = item[col.colKey]
       // }
        return <Table.Cell collapsing key={`${col.colKey}-${index}`}>{val}</Table.Cell>
      })
      return <Table.Row key={key}>{eachCol}</Table.Row>
    })
    renderColumn = renderColumn.map((item, key) => {
      return <Table.HeaderCell key={key}>{item.colName || item.colKey}</Table.HeaderCell>
    })

    return (
      <>
        <Table unstackable celled {...this.props.option} >
          <Table.Header>
            {this.props.title ?
              <Table.Row>
                <Table.HeaderCell colSpan={renderColumn.length}>{this.props.title}</Table.HeaderCell>
              </Table.Row> : null}
            <Table.Row>
              {renderColumn}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {renderData}
          </Table.Body>
        </Table>
      </>
    )
  }
}
