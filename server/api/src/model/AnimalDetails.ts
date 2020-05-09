import { Sequelize, Model, DataTypes, ModelAttributes } from 'sequelize';
import { Animal } from './Animal';
import { AnimalDetailsTypes } from './AnimalDetailsTypes';

export interface IAnimalDetails {
  id: number;
  detailTypeId: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Attributes: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: DataTypes.STRING
  },
  barcode: {
    type: DataTypes.STRING,
    unique: true,
    references: {
      model: Animal,
      key: 'barcode'
    },
    onDelete: 'CASCADE'
  },
  detailTypeId:{
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: AnimalDetailsTypes,
      key: 'id'
    }
  }
}

export class AnimalDetails extends Model<IAnimalDetails> {
  public attributesValue!: IAnimalDetails
  id!: number;
  detailTypeId!: number;
  text!: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const animalDetailsFactory = (sequelize: Sequelize) => {
  AnimalDetails.init(Attributes, {
    sequelize,
    tableName: 'SF_Animal_Details',
  })
  return AnimalDetails
}
