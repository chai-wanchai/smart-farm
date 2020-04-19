import React from 'react';
import logo from '../asset/logo.svg';
//import '../style/App.css';
import LineLogin from './login/LineLogin'
import GoogleLogin from './login/GoogleLogin'
import Layout from '../common/components/Layout'
import Header from '../common/components/Header';
import LIFF from '../common/LineLoginBase';
import AuthApi from '../api/AuthApi'
export default class App extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {
			displayName: '',
			userId: '',
			pictureUrl: '',
			statusMessage: '',
			resultQR: ''
		};
		this.OpenQR = this.OpenQR.bind(this);
		this.onClose = this.onClose.bind(this);
	}
	async componentDidMount() {
		// await LIFF.initialize()
		// const profile = await LIFF.getProfile()
		// this.setState({ ...profile })
	}
	async onClose(){
		const result = await AuthApi.loginWithUserPass('wanchai@gmail.com','chai')
		console.log(result)
	}
	async OpenQR() {
		try {
			const result = await LIFF.ScanCode()
			alert(JSON.stringify(result))
		} catch (error) {
			alert(JSON.stringify(error))
		}

		//this.setState({ resultQR: result })
	}
	render() {	
		return (
			<React.Fragment>
				<img src={this.state.pictureUrl} className="App-logo" alt="logo" />
				<p className="App-intro">
					Display Name : {this.state.displayName} <br />
					User ID : {this.state.userId} <br />
					Status Msg : {this.state.statusMessage}

					{JSON.stringify(this.state)}
					{JSON.stringify(process.env)}
				</p>
				<LineLogin />
				<GoogleLogin/>
				<button color="primary" onClick={this.OpenQR}>QR CODE</button>
				<button color="primary" onClick={this.onClose}>Close</button>

			</React.Fragment>
		)
	}
}
