import React, { Component } from 'react'
import logo from '../../asset/Line_Base.png';
import './lineLogin.css';
import LIFF from '../../common/LineLoginBase';
import AuthApi from '../../api/AuthApi'
export default class GoogleLogin extends Component<any> {

	constructor(props: any) {
		super(props)
		this.onClickLogin = this.onClickLogin.bind(this)
	}
	async onClickLogin() {
		try {
				const result = await AuthApi.loginWithGoogle()
		console.log(result);
		} catch (error) {
			console.log(error);
		}
	
	};
	render() {
		return (
			<React.Fragment>
				<button className='button-no-default button-expand-90 line-button' onClick={this.onClickLogin}>
					<img src={logo} alt='line'></img>
					<label>Log in with Google</label>
				</button>
			</React.Fragment>
		)
	}
}
