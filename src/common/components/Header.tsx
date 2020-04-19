import React from "react"
import '../../style/Header.css'
import logo from '../../asset/scg-logo.png'
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
export default class Header extends React.Component<any> {
	render() {
		return (
			<React.Fragment>
				<Navbar bg="dark">
					<Navbar.Brand href="#home">
						<img src={logo} width="100px" />
					</Navbar.Brand>
					<Navbar.Collapse className='navbar-collapse'>
						<Nav>
							<Nav.Item>
								<Link to="/login">Login</Link>
							</Nav.Item>
							<Nav.Item>
								<Link to="/">Home</Link>
							</Nav.Item>
							<Nav.Item>
								<Link to="/yy">Active</Link>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>


				</Navbar>
			</React.Fragment>
		)
	}
}