import dbService from '../../service/dbService'
import dbModel from '../../model'
import animal from '../../service/dbService/sf_animal'
import { ErrorHandle } from '../../common/errorHandle'
import moment from 'moment'
import { Model, FindOptions, FindAttributeOptions, UpdateOptions } from 'sequelize/types'
import sequelize from 'sequelize'
import { IAnimal } from '../../model/Animal'
export class SmartFarmManager {
  async getAnimalsType() {
    try {
      const rename: FindAttributeOptions = [
        ['id', 'animalTypeId'],
        'animalTypeName',
        'description',
        'animalSpeciesName'
      ]
      const result = await dbService.dbModelSmartFarm.animalTypes.findAll({ attributes: rename })
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async getFormDetails() {
    try {
      const rename: FindAttributeOptions = [
        ['id', 'detailId'],
        ['detailType', 'detailTypeName'],
        ['detailDescription', 'description']
      ]
      const result = await dbService.dbModelSmartFarm.animalDetailsTypes.findAll({ attributes: rename })
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async addAnimalPicture(data: any, pictureType?: string) {
    if (data.pictures.length > 0) {
      data.pictures.forEach(async (item) => {
        const buff = new Buffer(item.data)
        const insertPic = {
          barcode: data.barcode,
          picture: buff,
          fileName: item.fileName,
          pictureType: item.pictureType || pictureType
        }
        await dbService.dbModelSmartFarm.animalPicture.create(insertPic)
      })
    }
  }
  async addFormDetails(data: any) {
    let insert = []
    if (data.animalDetails.length > 0) {
      insert = data.animalDetails.map(async (item) => {

        const details = await dbService.dbModelSmartFarm.animalDetailsTypes.findOrCreate(
          {
            where: { detailType: item.detailTypeName },
            defaults: { detailType: item.detailTypeName, detailDescription: item.description }
          })
        item.detailId = details[0].id

        return item
      })
      insert = await Promise.all(insert)
    }
    return insert
  }
  async addAnimalDetails(data: any) {
    let inserted: any = await this.addFormDetails(data)
    let result: any = []
    if (inserted.length > 0) {
      inserted = inserted.map(async (item) => {
        const dataUpsert = { barcode: data.barcode, detailTypeId: item.detailId, text: item.value }
        const upsert = await dbService.dbModelSmartFarm.animalDetails.upsert(dataUpsert)
        return upsert
      })
    }
    return result
  }
  async findAnimalTypeID(data) {
    let animalType = { id: data.animalTypeId }
    if (data.animalTypeId === 0 && data.animalTypeOther) {
      const animalTypeResult = await dbService.dbModelSmartFarm.animalTypes.findOrCreate(
        { where: { animalTypeName: data.animalTypeOther }, defaults: { animalTypeName: data.animalTypeOther } })
      animalType.id = animalTypeResult[0].id
    }
    return animalType
  }
  async getAnimals(barcode?: string) {
    try {
      const option: FindOptions = {
        include: [
          {
            model: dbService.dbModelSmartFarm.animalPicture, as: 'pictures',
            attributes: ['id', 'pictureType', 'fileName', 'barcode',
            [sequelize.fn('CONCAT', '/api/v1/animal/pictures/', sequelize.col('pictures.barcode'),'/',sequelize.col('pictures.id'),'/',sequelize.col('pictures.fileName')), 'url']]
          },
          { model: dbService.dbModelSmartFarm.animalTypes, as: 'animalType' },
          { model: dbService.dbModelSmartFarm.animalDetails, as: 'animalDetails', attributes: ['id', ['text', 'value'], 'detailTypeId'] }
        ]
      }
      let result: any = []
      if (barcode) {
        result = await dbService.dbModelSmartFarm.animal.findByPk(barcode, option)
      } else {
        result = await dbService.dbModelSmartFarm.animal.findAll(option)
      }
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async deleteAnimalsByBarcode(barcode: string) {
    try {
      const data = await dbService.dbModelSmartFarm.animal.destroy({ where: { barcode: barcode } })
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
        barcode: data.barcode,
        animalName: data.animalName,
        DOB: data.DOB,
        sex: data.sex,
        animalTypeId: animalType.id,
        description: data.description,
        father: data.father,
        mother: data.mother,
        buyDate: data.buyDate
      }
      const result = await dbService.dbModelSmartFarm.animal.create(insertData)
      this.addAnimalPicture(data)
      this.addAnimalDetails(data)
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
        barcode: data.barcode,
        animalName: data.animalName,
        animalTypeId: animalType.id,
        DOB: data.DOB,
        sex: data.sex,
        description: data.description
      }
      const option: UpdateOptions = {
        where: { barcode: insertData.barcode },
        returning: true
      }
      const result = await dbService.dbModelSmartFarm.animal.update(insertData, option)
      this.addAnimalPicture(data)
      this.addAnimalDetails(data)
      return result[1]
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async getAnimalPictures(ID: number, barcode: string, filename: string) {
    try {
      const result = await dbService.dbModelSmartFarm.animalPicture.findOne({ where: { barcode: barcode, fileName: filename, id: ID } })
      return result
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
  async deleteAnimalPictures(ID: number) {
    try {
      const data = await dbService.dbModelSmartFarm.animalPicture.destroy({ where: { id: ID } })
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
      const totalAnimal = await dbService.dbModelSmartFarm.animal.count()
      const totalAnimalType = await dbService.dbModelSmartFarm.animal.count({ distinct: true, col: 'animalTypeId' })
      const EachAnimalType = await dbService.dbModelSmartFarm.animal.findAll({

        attributes: ['animalTypeId', [sequelize.fn('COUNT', sequelize.col('Animal.animalTypeId')), 'countAnimalType']],
        include: [
          {
            model: dbService.dbModelSmartFarm.animalTypes,
            as: 'animalType',
            attributes: ['animalTypeName', 'description', 'animalSpeciesName']
          }
        ]
        , group: [sequelize.col('Animal.animalTypeId'), sequelize.col('animalType.id')]
      })
      return { eachAnimalType: EachAnimalType, totalAnimal, totalAnimalType }
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err
    }
  }
}
export default new SmartFarmManager()