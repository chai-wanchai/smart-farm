import { Sequelize, Model, DataTypes, ModelAttributes, HasMany, Association } from 'sequelize';
import { AnimalTypes, animalTypesFactory } from './AnimalTypes';
export interface IAnimal {
  barcode: string;
  animalName: string;
  sex: string;
  DOB: Date;
  description: string;
  isActive: boolean;
  updatedAt: Date;
  father: string;
  mother: string;
  jsonData: string;
}
export const Attributes: ModelAttributes = {
  barcode: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  animalName: {
    type: DataTypes.STRING
  },
  sex: {
    type: DataTypes.STRING
  },
  DOB: {
    type: DataTypes.DATEONLY
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  father: {
    type: DataTypes.STRING
  },
  mother: {
    type: DataTypes.STRING
  },
  buyDate: {
    type: DataTypes.DATEONLY
  }
}

export class Animal extends Model<IAnimal> {
  barcode?: string;
  animalName?: string;
  sex?: string;
  DOB?: Date;
  description?: string;
  isActive?: boolean;
  updatedAt?: Date;
  father?: string;
  mother?: string;
  jsonData?: string;
  animalTypeId?: any
}

export const animalFactory = (sequelize: Sequelize) => {
  Animal.init(Attributes, {
    sequelize,
    tableName: 'SF_Animal'
  })
  return Animal
}
