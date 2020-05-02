import axios from './axios'
class SmartFarmApi {
  async saveAnimal(data: FormData): Promise<any> {
    const response = await axios.post(`/api/v1/animal/create`, { ...data })
    return response.data
  }
  async getAllAnimal(): Promise<any> {
    const response = await axios.get(`/api/v1/animal/view`)
    return response.data
  }
}
export default new SmartFarmApi()