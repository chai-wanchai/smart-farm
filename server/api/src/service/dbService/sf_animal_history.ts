import { Model, DataTypes, BuildOptions, ModelAttributes } from 'sequelize';
import Database from '../../common/database'
export const Attributes: ModelAttributes = {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}

export type ModelType = typeof Model & { new(values?: object, options?: BuildOptions); }
const modelSchema = <ModelType>Database.connection.define('SF_Animal_History', Attributes, { tableName: 'SF_Animal_History' });
export default modelSchema