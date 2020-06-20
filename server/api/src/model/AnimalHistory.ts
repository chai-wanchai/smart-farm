import { Sequelize, Model, DataTypes, ModelAttributes } from 'sequelize';
import { Animal } from './Animal';

export interface IAnimalHistory {
  id: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Attributes: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  barcode: {
    type: DataTypes.STRING,
    references: {
      model: Animal,
      key: 'barcode'
    },
    onDelete: 'CASCADE'
  },
  picList:{
    type: DataTypes.ARRAY(DataTypes.DECIMAL)
  }
}
export class AnimalHistory extends Model<IAnimalHistory> {
  public attributesValue!: IAnimalHistory
  public id!: number;
  public description!: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const animalHistoryFactory = (sequelize: Sequelize) => {
  AnimalHistory.init(Attributes, {
    sequelize,
    tableName: 'SF_Animal_History',
  })
  return AnimalHistory
}
