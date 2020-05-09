import { Sequelize, Model, DataTypes, ModelAttributes } from 'sequelize';
import { Animal } from './Animal';

export interface IAnimalPicture {
  id: number;
  picture: any;
  fileName: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Attributes: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  picture: {
    type: DataTypes.BLOB,
    allowNull: true
  },
  pictureType: {
    type: DataTypes.STRING
  },
  fileName: {
    type: DataTypes.STRING
  },
  barcode: {
    type: DataTypes.STRING,
    references: {
      model: Animal,
      key: 'barcode'
    },
    onDelete: 'CASCADE'
  }
}

export class AnimalPicture extends Model<IAnimalPicture> {
  public attributesValue!: IAnimalPicture
  public id!: number;
  public picture!: any;
  public fileName!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export const animalPictureFactory = (sequelize: Sequelize) => {
  AnimalPicture.init(Attributes, {
    sequelize,
    tableName: 'SF_Animal_Pictures',
  })
  return AnimalPicture
}
