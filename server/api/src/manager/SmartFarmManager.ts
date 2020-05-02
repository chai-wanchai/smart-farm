import dbService from '../service/dbService'
import animal from '../service/dbService/sf_animal'
import { ErrorHandle } from '../common/errorHandle'
import moment from 'moment'
import { Model, FindOptions, FindAttributeOptions } from 'sequelize/types'
export class SmartFarmManager {
  async getAnimals() {
    try {
      const rename: FindAttributeOptions = [['AnimalName', 'name'], ['Barcode', 'barcode'], ['DOB', 'dob'], ['Description', 'description']]
      const option: FindOptions = { include: [{ model: dbService.animalPic, as: 'pictures', attributes: ['ID',['Picture', 'base64']] }], attributes: rename }
      const result = await dbService.animal.findAll(option)
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
          const buff = new Buffer(item.data)
          const insertPic = {
            Barcode: data.barcode,
            Picture: buff,
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