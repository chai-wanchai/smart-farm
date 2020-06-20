import { Model, DataTypes, BuildOptions, ModelAttributes, UUIDV4, UUIDV1 } from 'sequelize';
import Database from '../../common/database'
export const Attributes: ModelAttributes = {
  configCode: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true
  },
  configName: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  configDefaultValue: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}
export type ConfigModelType = typeof Model & { new(values?: object, options?: BuildOptions); }
const ConfigModel = <ConfigModelType>Database.connection.define('Config', Attributes, { tableName: 'Config' });
ConfigModel.sync()
export default ConfigModel