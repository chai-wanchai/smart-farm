import axios from 'axios'
import CookieUtils from '../common/cookie'
export default (function () {
    axios.defaults.timeout = 60000 // 60 sec    
    axios.interceptors.request.use(async (config) => {
        const jwtToken = await CookieUtils.get("tkn")
        if (jwtToken) {
            config.headers = { ...config.headers, 'authorization': `: Bearer ${jwtToken}` }
        }
        return config;
    })
    axios.interceptors.response.use(async (response) => { return response }, async (error) => {
        console.log(error.config)
        // const originalRequest = error.config
        // const serverCallUrl = new URL(originalRequest.url)
        // const status = error.response.status
        // if ((status === 401 || status === 403) && !originalRequest._retry &&
        //     !serverCallUrl.pathname.includes('/auth')
        // ) {
        //     let token = await CookieUtils.get("rs_tkn")
        //     originalRequest._retry = true
        //     if (token) {
        //         originalRequest.headers.authorization = `Bearer ${token}`
        //         return axios(originalRequest)
        //     }

        // }
        return Promise.reject(error)
    })
    return axios
})()