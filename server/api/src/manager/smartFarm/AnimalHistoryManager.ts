import dbService from '../../service/dbService'
import dbModel from '../../model'
import animal from '../../service/dbService/sf_animal'
import { ErrorHandle } from '../../common/errorHandle'
import moment from 'moment'
import { Model, FindOptions, FindAttributeOptions, UpdateOptions } from 'sequelize/types'
import sequelize from 'sequelize'
import { IAnimal } from '../../model/Animal'
import { IAnimalHistoryClient } from '../../types/animalForm'
import pictureManager from './AnimalPictureManage'
export class AnimalHistoryManager {
  async createHistory(data: IAnimalHistoryClient) {
    const pic = await pictureManager.addAnimalPicture(data.barcode, data)
    const picID = pic.map(item => item.id)
    const historyData = {
      barcode: data.barcode,
      date: data.date,
      description: data.description,
      title: data.title,
      picList: picID
    }
    const result = await dbService.dbModelSmartFarm.animalHistory.create(historyData)
    return result
  }
  async getHistory(barcode?: string) {
    let result: any = []
    let option: FindOptions = {
      include: [
        {
          model: dbService.dbModelSmartFarm.animalPicture, as: 'pictures',
          where: { pictureType: 'history' }, required: false,
          attributes: ['id', 'pictureType', 'fileName', 'barcode',
            [sequelize.fn('CONCAT', '/api/v1/animal/pictures/', sequelize.col('pictures.barcode'), '/', sequelize.col('pictures.id'), '/', sequelize.col('pictures.fileName')), 'url']]
        }
      ], logging: true
    }
    if (barcode) {
      option.where = { barcode: barcode }
      result = await dbService.dbModelSmartFarm.animalHistory.findAll(option)
    } else {
      result = await dbService.dbModelSmartFarm.animalHistory.findAll()
    }
    const final = result.map((item) => {
      const filterPic = item.pictures.reduce((list, pic) => {
        if (item.picList && item.picList.includes((pic.id).toString())) {
          list.push(pic)
        }
        return list
      }, [])

      item.dataValues.pictures = filterPic
      return item
    })
    return final
  }
}
export default new AnimalHistoryManager()