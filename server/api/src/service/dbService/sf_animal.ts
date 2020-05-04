import { Model, DataTypes, BuildOptions, ModelAttributes } from 'sequelize';
import Database from '../../common/database'
export const Attributes: ModelAttributes = {
  Barcode: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  AnimalName: {
    type: DataTypes.STRING
  },
  Sex: {
    type: DataTypes.STRING
  },
  DOB: {
    type: DataTypes.DATEONLY
  },
  Description: {
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
  }
}

export type ModelType = typeof Model & { new(values?: object, options?: BuildOptions); }
const modelSchema = <ModelType>Database.connection.define('SF_Animal', Attributes, { tableName: 'SF_Animal' });

export default modelSchema