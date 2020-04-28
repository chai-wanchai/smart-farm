import React from 'react';
import Home from '../src/modules/dashboard/Home';
export class HomePage extends React.Component<any>{
	// constructor(props: any) {
	// 	super(props);
	// }
	render() {
		console.log(this.props)
		return (
			<React.Fragment>
				<Home />
			</React.Fragment>
		)
	}
}

export default HomePage