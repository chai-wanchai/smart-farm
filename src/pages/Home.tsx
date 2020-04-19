import React from 'react';
import App from '../modules/App'
export class Home extends React.Component<any>{
	constructor(props: any) {
		super(props);
	}
	render() {
		return (
			<React.Fragment>
				<App />
			</React.Fragment>
		)
	}
}

export default Home