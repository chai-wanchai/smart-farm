import dbService from '../../service/dbService'
import dbModel from '../../model'
import animal from '../../service/dbService/sf_animal'
import { ErrorHandle } from '../../common/errorHandle'
import moment from 'moment'
import { Model, FindOptions, FindAttributeOptions, UpdateOptions } from 'sequelize/types'
import sequelize from 'sequelize'
import { IAnimal } from '../../model/Animal'
import { IAnimalHistoryClient } from '../../types/animalForm'
export class AnimalPictureManager {
  async addAnimalPicture(barcode: string, data: any, pictureType?: string) {
    let result: any = []
    if (data.pictures.length > 0) {
      result = data.pictures.map(async (item) => {
        const buff = new Buffer(item.data)
        const insertPic = {
          barcode: barcode,
          picture: buff,
          fileName: item.fileName,
          pictureType: item.pictureType || pictureType
        }
        const create = await dbService.dbModelSmartFarm.animalPicture.create(insertPic)
        return create
      })
      result = await Promise.all(result)
    }
    return result
  }
}
export default new AnimalPictureManager()