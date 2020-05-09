
import { Sequelize, Model, DataTypes, ModelAttributes } from 'sequelize';

export interface IAnimalTypes {
  id: number;
  animalTypeName: string;
  description: string;
  animalSpeciesName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Attributes: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  animalTypeName: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  animalSpeciesName: {
    type: DataTypes.STRING
  }
}
export class AnimalTypes extends Model<IAnimalTypes> {
  public attributesValue!: IAnimalTypes
  public id!: number;
  public animalTypeName!: string;
  public description!: string;
  public animalSpeciesName!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export const animalTypesFactory = (sequelize: Sequelize) => {
  AnimalTypes.init(Attributes, {
    sequelize,
    tableName: 'SF_Animal_Types',
  })
  return AnimalTypes
}
