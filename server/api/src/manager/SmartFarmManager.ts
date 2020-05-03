import dbService from '../service/dbService'
import animal from '../service/dbService/sf_animal'
import { ErrorHandle } from '../common/errorHandle'
import moment from 'moment'
import { Model, FindOptions, FindAttributeOptions, UpdateOptions } from 'sequelize/types'
import sequelize from 'sequelize'
export class SmartFarmManager {
  async getAnimalsType() {
    try {
      const rename: FindAttributeOptions = [
        ['ID', 'animalTypeId'],
        ['AnimalTypeName', 'animalTypeName'],
        ['Description', 'description']
      ]
      const result = await dbService.animalType.findAll({ attributes: rename })
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async addAnimalPicture(data: any) {
    if (data.pictures.length > 0) {
      data.pictures.forEach(async (item) => {
        const buff = new Buffer(item.data)
        const insertPic = {
          Barcode: data.barcode,
          Picture: buff,
          FileName: item.filename
        }
        await dbService.animalPic.create(insertPic)
      })
    }
  }
  async findAnimalTypeID(data) {
    let animalType = { ID: data.animalTypeId }
    if (data.animalTypeId === 0 && data.animalTypeOther) {
      const animalTypeResult = await dbService.animalType.findOrCreate(
        { where: { AnimalTypeName: data.animalTypeOther }, defaults: { AnimalTypeName: data.animalTypeOther } })
      animalType.ID = animalTypeResult[0].ID
    }
    return animalType
  }
  async getAnimals(barcode?: string) {
    try {
      const rename: FindAttributeOptions = [
        ['AnimalName', 'name'],
        ['Barcode', 'barcode'],
        ['DOB', 'dob'],
        ['Description', 'description'],
        ['Sex', 'sex'],
        ['AnimalTypeId', 'animalTypeId']
      ]
      const option: FindOptions = {
        include: [
          { model: dbService.animalPic, as: 'pictures', attributes: ['ID', ['FileName', 'filename']] },
          { model: dbService.animalType, as: 'AnimalType', attributes: ['AnimalTypeName', 'Description', 'AnimalSpeciesName'] }
        ],
        attributes: rename
      }
      let result: any = []
      if (barcode) {
        result = await dbService.animal.findByPk(barcode, option)
      } else {
        result = await dbService.animal.findAll(option)
      }
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async deleteAnimalsByBarcode(barcode: string) {
    try {
      const data = await dbService.animal.destroy({ where: { Barcode: barcode } })
      let result = {
        isSuccess: true,
        deleted: barcode
      }
      if (data === 0) {
        result.isSuccess = false
      }
      return result
    } catch (e) {
      const err = new ErrorHandle(e)
      throw err
    }
  }
  async createAnimal(data) {
    try {
      const animalType = await this.findAnimalTypeID(data)
      const insertData = {
        Barcode: data.barcode,
        AnimalName: data.name,
        DOB: data.dob,
        Sex: data.sex,
        AnimalTypeId: animalType.ID,
        Description: data.description
      }
      const result = await dbService.animal.create(insertData)
      this.addAnimalPicture(data)
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async updateAnimal(data) {
    try {
      const animalType = await this.findAnimalTypeID(data)
      const insertData = {
        Barcode: data.barcode,
        AnimalName: data.name,
        AnimalTypeId: animalType.ID,
        DOB: data.dob,
        Sex: data.sex,
        Description: data.description
      }
      const option: UpdateOptions = {
        where: { Barcode: insertData.Barcode },
        returning: true
      }
      const result = await dbService.animal.update(insertData, option)
      this.addAnimalPicture(data)
      return result[1]
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
  async getAnimalPictures(ID: number, barcode: string, filename: string) {
    try {
      const result = await dbService.animalPic.findOne({ where: { Barcode: barcode, FileName: filename, ID: ID } })
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async deleteAnimalPictures(ID: number) {
    try {
      const data = await dbService.animalPic.destroy({ where: { ID: ID } })
      let result = {
        isSuccess: true,
        deleted: ID
      }
      if (data === 0) {
        result.isSuccess = false
      }
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async getSummaryFarm() {
    try {
      const totalAnimal = await dbService.animal.count()
      const totalAnimalType = await dbService.animalType.count()
      const EachAnimalType = await dbService.animal.findAll({

        attributes: ['AnimalTypeId', [sequelize.fn('COUNT', sequelize.col('SF_Animal.AnimalTypeId')), 'CountAnimalType']],
        include: [
          {
            model: dbService.animalType,
            as: 'AnimalType',
            attributes: ['AnimalTypeName', 'Description', 'AnimalSpeciesName']
          }
        ]
        , group: ['SF_Animal.AnimalTypeId', 'AnimalType.ID'],
      })
      return { eachAnimalType: EachAnimalType, totalAnimal, totalAnimalType }
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
}
export default new SmartFarmManager()