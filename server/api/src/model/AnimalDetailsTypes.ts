import { Sequelize, Model, DataTypes, ModelAttributes } from 'sequelize';

export interface IAnimalDetailsTypes {
  id: number;
  detailType: string;
  detailDescription: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Attributes: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  detailType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detailDescription: {
    type: DataTypes.TEXT
  }
}

export class AnimalDetailsTypes extends Model<IAnimalDetailsTypes> {
  public attributesValue!: IAnimalDetailsTypes
  id!: number;
  detailType!: string;
  detailDescription!: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const animalDetailsTypesFactory = (sequelize: Sequelize) => {
  AnimalDetailsTypes.init(Attributes, {
    sequelize,
    tableName: 'SF_Details_Types',
  })
  return AnimalDetailsTypes
}
