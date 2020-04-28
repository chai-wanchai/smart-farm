import React from "react"
import logo from '../../asset/app-logo.png'
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, MenuItemProps } from 'semantic-ui-react'
import Router from 'next/router';
interface IMenu {
	menuId: number;
	menuName: string;
	url?: string;
	isActive: boolean;
	menuChildren?: Array<IMenu>
}
interface IState {
	menuList: Array<IMenu>
}

export default class HeaderLayout extends React.Component<any, IState> {
	constructor(props) {
		super(props);
		this.state = {
			menuList: [
				{ menuId: 1, menuName: 'หน้าแรก', url: '/home', isActive: false },
				{ menuId: 2, menuName: 'บันทึกประวัติ', url: '/maintain/history', isActive: false },
				{
					menuId: 3, menuName: 'จัดการข้อมูลสัตว์', url: '/maintain/animal', isActive: false,
					// menuChildren: [
					// 	{ menuId: 4, menuName: 'เพิ่มข้อมูลสัตว์', url: '/maintain/animal/create', isActive: false },
					// 	{ menuId: 4, menuName: 'แก้ไขข้อมูลสัตว์', url: '/maintain/animal/edit', isActive: false }
					// ]
				}
			]
		}
		this.onClickLink = this.onClickLink.bind(this)
	}
	componentDidMount() {
		const router = Router.router;
		if (router && router.asPath) {
			const path = router.asPath;
			let stateMenu = this.state.menuList.map(item => {
				if (item.url === path) {
					item.isActive = true
				} else {
					item.isActive = false
				}
				return item;
			})
			this.setState({ menuList: stateMenu })
		}
	}
	onClickLink(e: any, dataEvent: any) {
		let dataState = this.state.menuList.map(item => {
			if (item.menuId === dataEvent.data.menuId) {
				item.isActive = true;
			} else {
				item.isActive = false;
			}
			return item;
		})
		this.setState({ menuList: dataState })
	}
	renderMenu(menuData: IMenu) {

	}
	render() {
		return (
			<React.Fragment>
				<Menu fixed='top' color="red">
					<Container fluid={true}>
						<Menu.Item as='a' header href='/'>
							<Image size='mini' src='/img/app-logo.png' style={{ marginRight: '1.5em' }} />
         			Smart Farm
        		</Menu.Item>
						<Menu.Menu position={"right"}>
							{this.state.menuList.map(item => {
								return <Menu.Item as='a' href={item.url} key={item.menuId} active={item.isActive} onClick={this.onClickLink} data={item}>{item.menuName}</Menu.Item>
							})}
						</Menu.Menu>

					</Container>
				</Menu>
			</React.Fragment>
		)
	}
}