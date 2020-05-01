import dbService from '../service/dbService'
import { ErrorHandle } from '../common/errorHandle'
import moment from 'moment'
export class SmartFarmManager {
  async getAnimals() {
    try {
      const result = await dbService.animal.findAll()
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async createAnimal(data) {
    try {
      const insertData = {
        Barcode: data.barcode,
        AnimalName: data.name,
        //DOB: data.dob,
        Description: data.description
      }
      const result = await dbService.animal.create(insertData)
      if (data.picture.length > 0) {
        data.picture.forEach(async (item) => {
          const insertPic = {
            Barcode: data.barcode,
            Picture: item.data,
            FileName: item.filename
          }
          await dbService.animalPic.create(insertPic)
        })
      }
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async updateAnimal(data) {
    try {
      const result = await dbService.animal.create(data)
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async createAnimalHistory(data) {
    try {
      const result = await dbService.animalHistory.create(data)
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
}
export default new SmartFarmManager()