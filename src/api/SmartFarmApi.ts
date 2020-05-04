import axios from './axios'
import { ErrorHandle } from '../common/Errorhandle'
import { IFormDetails } from '../models/SmartFarm'
class SmartFarmApi {
  async getAnimalsType() {
    try {
      const response = await axios.get(`/api/v1/animal/type`)
      return response.data
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err.getError()
    }
  }
  async getFormDetails():Promise<IFormDetails[]> {
    try {
      const response = await axios.get(`/api/v1/animal/form/details`)
      return response.data
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err.getError()
    }
  }
  async saveAnimal(data: FormData): Promise<any> {
    try {
      const response = await axios.post(`/api/v1/animal/create`, { ...data })
      return response.data
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err.getError()
    }

  }
  async updateAnimalInfo(data: FormData): Promise<any> {
    try {
      const response = await axios.put(`/api/v1/animal/update`, { ...data })
      return response.data
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err.getError()
    }
  }
  async getAllAnimal(): Promise<any> {
    try {
      const response = await axios.get(`/api/v1/animal/view`)
      return response.data
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err.getError()
    }

  }
  async getAnimalByBarcode(barcode: string): Promise<any> {
    try {
      const response = await axios.get(`/api/v1/animal/view/${barcode}`)
      return response.data
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err.getError()
    }

  }
  async deleteAnimalPicture(id: number): Promise<any> {
    try {
      const response = await axios.delete(`/api/v1/animal/pictures/${id}`)
      return response.data
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err.getError()
    }
  }
  async deleteAnimal(barcode: string): Promise<any> {
    try {
      const response = await axios.delete(`/api/v1/animal/${barcode}`)
      return response.data
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err.getError()
    }
  }
  async getSummaryFarm() {
    try {
      const response = await axios.get(`/api/v1/farm/summary`)
      return response.data
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err.getError()
    }

  }
}
export default new SmartFarmApi()