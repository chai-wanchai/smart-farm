import { Model, DataTypes, BuildOptions, ModelAttributes } from 'sequelize';
import Database from '../../common/database'
export const Attributes: ModelAttributes = {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  AnimalTypeName: {
    type: DataTypes.STRING
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  AnimalSpeciesName: {
    type: DataTypes.STRING
  }
}

export type ModelType = typeof Model & { new(values?: object, options?: BuildOptions); }
const modelSchema = <ModelType>Database.connection.define('SF_Animal_Type', Attributes, { tableName: 'SF_Animal_Type' });

export default modelSchema