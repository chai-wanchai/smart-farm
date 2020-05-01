import axios from './axios'
class SmartFarmApi {
  async saveAnimal(data: FormData): Promise<any> {
    const response = await axios.post(`/api/v1/animal/create`, { ...data })
    return response.data
  }
}
export default new SmartFarmApi()