import React from "react";
import Header from './Header'
import Footer from './Footer'
export default class Layout extends React.Component<any> {
	constructor(props: any) {
		super(props)
	}
	render() {
		return (
			<React.Fragment>
				<Header />
				{this.props.children}
				<Footer />
			</React.Fragment>
		)
	}
}