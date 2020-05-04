import { Model, DataTypes, BuildOptions, ModelAttributes } from 'sequelize';
import Database from '../../common/database'
export const Attributes: ModelAttributes = {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  DetailType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DetailDescription: {
    type: DataTypes.TEXT
  }
}

export type ModelType = typeof Model & { new(values?: object, options?: BuildOptions); }
const modelSchema = <ModelType>Database.connection.define('SF_Form_Details', Attributes, { tableName: 'SF_Form_Details' });
export default modelSchema