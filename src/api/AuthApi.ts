import axios from './axios'
import queryString from 'querystring'
class AuthApi {
  async loginWithLine(accessToken: string): Promise<any> {
    const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/login/line`, { access_token: accessToken })
    return data.data
  }
  async loginWithGoogle(): Promise<any> {
    const query = {
      client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
      redirect_uri: `${window.location.origin}`,
      response_type: 'code',
      scope: 'openid profile email'
    }
    const url = `${process.env.REACT_APP_GOOGLE_API_URL}/o/oauth2/v2/auth?${queryString.stringify(query)}`
    window.open(url)
  }
  async loginWithUserPass(username: string, password: string): Promise<any> {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/login`, { username: username, password: password })
    return result.data
  }
  async refreshToken(): Promise<any> {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/login/auth`)
    return result.data
  }
}

export default new AuthApi()