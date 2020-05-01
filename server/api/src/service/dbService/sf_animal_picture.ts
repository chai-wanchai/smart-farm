import { Model, DataTypes, BuildOptions, ModelAttributes } from 'sequelize';
import Database from '../../common/database'
export const Attributes: ModelAttributes = {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Picture: {
    type: DataTypes.BLOB,
    allowNull: true
  },
  FileName:{
    type: DataTypes.STRING
  }
}

export type ModelType = typeof Model & { new(values?: object, options?: BuildOptions); }
const modelSchema = <ModelType>Database.connection.define('SF_Animal_Picture', Attributes, { tableName: 'SF_Animal_Picture' });
export default modelSchema