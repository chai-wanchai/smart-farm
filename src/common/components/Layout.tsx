import React from "react";
import HeaderLayout from './Header'
import Footer from './Footer'
import { Container, Header } from "semantic-ui-react";
export default class Layout extends React.Component<any> {
	constructor(props: any) {
		super(props)
	}
	render() {
		return (
			<React.Fragment>
				<HeaderLayout {...this.props}/>
				<Container width="12" style={{ marginTop: '5em' }}>				
					{this.props.children}
				</Container>
				<Footer />
			</React.Fragment>
		)
	}
}