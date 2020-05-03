import React, { Component } from 'react';
import { Menu, Segment, Grid } from 'semantic-ui-react';
import AnimalForm from '../../src/modules/maintain/AnimalForm';
import * as _ from 'lodash';
import Home from '../../src/modules/dashboard/Home';
import ListAnimal from '../../src/modules/maintain/ListAnimal';
import Router from 'next/router';
class animal extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        { menuId: 1, menuName: 'เพิ่มข้อมูลสัตว์', path: '/maintain/animal/create', isActive: false },
        { menuId: 2, menuName: 'ปรับปรุงข้อมูลสัตว์', path: '/maintain/animal/edit', isActive: false }
      ]
    }
    this.onCheckMenu = this.onCheckMenu.bind(this)
    this.renderChildComponent = this.renderChildComponent.bind(this)
  }
  componentDidMount() {
    this.setActiveMenu()
  }
  setActiveMenu(data?: any) {
    let menu = this.state.menu.map(item => {
      if (item.path === Router.asPath) {
        if (data && data.menuId === item.menuId) {
          item.isActive = true
        }
        item.isActive = true
      } else {
        item.isActive = false
      }
      return item;
    })
    this.setState({ menu })
  }
  onCheckMenu(e, dataEvent) {
    this.setActiveMenu(dataEvent.data)
    Router.push(dataEvent.data.path)
  }
  renderChildComponent() {
    const menuActive: any = _.find(this.state.menu, { isActive: true })
    if (menuActive) {
      if (menuActive.menuId === 1) {
        return <AnimalForm mode="create" />
      } else {
        return <ListAnimal mode="edit" />
      }
    } else {
      return null
    }
  }
  render() {
    const ChildrenComponent = this.renderChildComponent()
    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={16}>
            <Menu tabular>
              {this.state.menu.map(item => {
                return <Menu.Item active={item.isActive} name={item.menuName} key={item.menuId} data={item} onClick={this.onCheckMenu} />
              })}
            </Menu>

            {ChildrenComponent ? <Segment>{ChildrenComponent}</Segment> : null}

          </Grid.Column>
        </Grid>
      </React.Fragment >
    );
  }
}

export default animal;