import { Sequelize } from "sequelize"
import { animalFactory } from "./Animal";
import { animalPictureFactory } from "./AnimalPicture";
import { animalHistoryFactory } from "./AnimalHistory";
import { animalDetailsTypesFactory } from "./AnimalDetailsTypes";
import { animalTypesFactory } from "./AnimalTypes";
import { animalDetailsFactory } from "./AnimalDetails";
import { userFactory } from './Auth/User'
import { roleFactory } from './Auth/Role'
import { tokenFactory } from './Auth/Token'
import { permissionFactory } from './Auth/Permission'
import { clientFactory } from './Auth/Client'
import { clientConfigFactory } from "./Auth/ClientConfig";
import { systemConfigFactory } from "./Auth/SystemConfig";

export const createAuthModel = (sequelize: Sequelize) => {
  const users = userFactory(sequelize);
  const userToken = tokenFactory(sequelize);
  const client = clientFactory(sequelize);
  const role = roleFactory(sequelize);
  const permission = permissionFactory(sequelize);
  const rolePermission = roleFactory(sequelize);
  const systemConfig = systemConfigFactory(sequelize);
  const clientConfig = clientConfigFactory(sequelize);
  const models = {
    users,
    userToken,
    client,
    role,
    permission,
    rolePermission,
    clientConfig,
    systemConfig
  }
  return models;
}

export const createSmartFarmModel = (sequelize: Sequelize) => {
  const animal = animalFactory(sequelize)
  const animalPicture = animalPictureFactory(sequelize)
  const animalHistory = animalHistoryFactory(sequelize)
  const animalDetailsTypes = animalDetailsTypesFactory(sequelize)
  const animalTypes = animalTypesFactory(sequelize)
  const animalDetails = animalDetailsFactory(sequelize)

  animal.hasMany(animalPicture, { sourceKey: 'barcode', foreignKey: 'barcode', as: 'pictures' })
  animal.hasMany(animalHistory, { sourceKey: 'barcode', foreignKey: 'barcode', as: 'history' })
  animal.belongsTo(animalTypes, { foreignKey: 'animalTypeId', as: 'animalType' })
  animalDetailsTypes.belongsToMany(animal, { through: { model: animalDetails, unique: true }, foreignKey: 'detailTypeId' })
  animal.belongsToMany(animalDetailsTypes, { through: { model: animalDetails, unique: true }, foreignKey: 'barcode' })
  animal.hasMany(animalDetails, { sourceKey: 'barcode', foreignKey: 'barcode', as: 'animalDetails' })
  animalHistory.hasMany(animalPicture, { sourceKey: 'barcode', foreignKey: 'barcode', as: 'pictures' })
  // animalDetails.belongsTo(animalDetailsTypes, { foreignKey: 'detailTypeId'})

  // ---------- export model ---------------------// 
  const models = {
    animal,
    animalPicture,
    animalHistory,
    animalDetailsTypes,
    animalTypes,
    animalDetails
  }
  return models;
};

export default createSmartFarmModel