import axios from './axios'
class SmartFarmApi {
  async getAnimalsType(){
    const response = await axios.get(`/api/v1/animal/type`)
    return response.data
  }
  async saveAnimal(data: FormData): Promise<any> {
    const response = await axios.post(`/api/v1/animal/create`, { ...data })
    return response.data
  }
  async updateAnimalInfo(data: FormData): Promise<any> {
    const response = await axios.put(`/api/v1/animal/update`, { ...data })
    return response.data
  }
  async getAllAnimal(): Promise<any> {
    const response = await axios.get(`/api/v1/animal/view`)
    return response.data
  }
  async getAnimalByBarcode(barcode: string): Promise<any> {
    const response = await axios.get(`/api/v1/animal/view/${barcode}`)
    return response.data
  }
  async deleteAnimalPicture(id: number): Promise<any> {
    const response = await axios.delete(`/api/v1/animal/pictures/${id}`)
    return response.data
  }
  async deleteAnimal(barcode: string): Promise<any> {
    const response = await axios.delete(`/api/v1/animal/${barcode}`)
    return response.data
  }
}
export default new SmartFarmApi()