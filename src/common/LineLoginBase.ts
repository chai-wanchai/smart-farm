import * as _ from 'lodash'
const Windows = window as any
export class LIFF {
	public liff: any = Windows.liff
	liffId: string = '1653889562-E1gkq4o8'//'1614469837-39D866X7'
	private profile = {}
	private access_token = ''
	constructor() {
		this.liff = Windows.liff
	}
	async initialize(liffId?: string) {
		await this.liff.init({ liffId: liffId || this.liffId })
		if (!this.liff.isLoggedIn()) {
			this.liff.login()
		} else {
			this.access_token = await this.liff.getAccessToken();
		}
	}
	async getProfile() {
		this.profile = await this.liff.getProfile();
		return this.profile
	}
	async ScanCode() {
		if (this.liff.scanCode) {
			const resultQR = await this.liff.scanCode()
			return resultQR
		}
	}
	closeLiff() {
		this.liff.closeWindow();
	}
	sendMessage(Msg: Array<any>) {
		this.liff.sendMessages(Msg)
	}
	getOS() {
		return this.liff.getOS();
	}
	getLanguage() {
		return this.liff.getLanguage();
	}
	getAccessToken() {
		if (_.isEmpty(this.access_token)) {
			return this.liff.getAccessToken();
		} else {
			return this.access_token
		}

	}
	async getDecodedIDToken() {
		const result = await this.liff.getDecodedIDToken();
		return result
	}
}
export default new LIFF()