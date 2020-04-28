import axios from './axios'
class SmartFarmApi {
  async saveAnimal(data: FormData): Promise<any> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/`, { ...data })
    return response.data
  }
}
export default new SmartFarmApi()