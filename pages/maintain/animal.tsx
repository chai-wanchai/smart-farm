import React, { Component } from 'react';
import { Menu, Segment, Grid } from 'semantic-ui-react';
import AnimalForm from '../../src/modules/maintain/AnimalForm';
import * as _ from 'lodash';
import Home from '../../src/modules/dashboard/Home';
class animal extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        { menuId: 1, menuName: 'เพิ่มข้อมูลสัตว์', component: AnimalForm, isActive: true },
        { menuId: 2, menuName: 'ปรับปรุงข้อมูลสัตว์', component: Home, isActive: false }
      ]
    }
    this.onClickMenu = this.onClickMenu.bind(this)
  }
  onClickMenu(e, dataEvent) {
    let menu = this.state.menu.map(item => {
      if (item.menuId === dataEvent.data.menuId) {
        item.isActive = true
      } else {
        item.isActive = false
      }
      return item;
    })
    this.setState({ menu })
  }
  render() {
    const ChildComponent = _.find(this.state.menu, { isActive: true }).component

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={16}>
            <Menu tabular>
              {this.state.menu.map(item => {
                return <Menu.Item active={item.isActive} name={item.menuName} key={item.menuId} data={item} onClick={this.onClickMenu} />
              })}
            </Menu>
         
            <Segment>
              <ChildComponent />
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment >
    );
  }
}

export default animal;