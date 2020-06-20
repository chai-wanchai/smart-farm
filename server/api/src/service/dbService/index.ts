// import client from './client'
// import role from './role'
// import token from './token'
// import permission from './permission'
// import user, { UserModelType } from './user'
// import systemConfig from './systemConfig'
// import { DataTypes } from 'sequelize'
// import Database from '../../common/database'
// import animalType from './sf_animal_type'
// import animal from './sf_animal'
// import animalHistory from './sf_animal_history'
// import animalPic from './sf_animal_picture'
// import formDetails from './sf_form_details'
// /// ------------------- Many-To-Many Feild -----------------------------------////
// const isActive = { isActive: { type: DataTypes.BOOLEAN, defaultValue: true } }
// const clientConfigSchema = {
//   isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
//   value: { type: DataTypes.TEXT },
//   createdBy: {
//     type: DataTypes.INTEGER
//   },
//   updatedBy: {
//     type: DataTypes.INTEGER
//   },
// }
// const sf_animal_details = {
//   value: { type: DataTypes.TEXT }
// }
// /// ------------------- Relationship One-To-Many -----------------------------////

// /// ------------------- End Relationship One-To-Many -----------------------------////

// /// ------------------- Relationship Many-To-Many -----------------------------////
// const RolePermission = <UserModelType>Database.connection.define('RolePermission', isActive, { tableName: 'RolePermission' });
// role.belongsToMany(permission, { through: RolePermission, foreignKey: 'roleId' });
// permission.belongsToMany(role, { through: RolePermission, foreignKey: 'permissionId' })

// // const userRole = <UserModelType>Database.connection.define('UsersRole', isActive, { tableName: 'UsersRole' });
// // user.belongsToMany(role, { through: userRole, foreignKey: 'userId' });
// // role.belongsToMany(user, { through: userRole, foreignKey: 'roleId' });
// const clientConfig = <UserModelType>Database.connection.define('ClientConfig', clientConfigSchema, { tableName: 'ClientConfig' });
// clientConfig.sync({ alter: true })
// systemConfig.belongsToMany(client, { through: clientConfig, foreignKey: 'configCode' });
// client.belongsToMany(systemConfig, { through: clientConfig, foreignKey: 'clientId' })
// user.belongsToMany(client, { through: { model: token, unique: false }, foreignKey: 'userId' });
// client.belongsToMany(user, { through: { model: token, unique: false }, foreignKey: 'clientId' });
// client.hasMany(role, { foreignKey: 'clientId' })
// role.belongsTo(client, { foreignKey: 'roleId' })
// client.hasMany(permission, { foreignKey: 'clientId' })
// permission.belongsTo(client, { foreignKey: 'permissionId' })
// /// ------------------- End Relationship Many-To-Many -----------------------------////
// // animalType.hasOne(animal, { foreignKey: 'Barcode', as: 'Animal' })
// // animal.belongsTo(animalType, { foreignKey: 'AnimalTypeId', as: 'AnimalType' })
// // animal.hasMany(animalHistory, { foreignKey: 'Barcode' })
// // animalHistory.hasMany(animal, { foreignKey: 'Barcode' })
// // animal.hasMany(animalPic, { foreignKey: 'Barcode', as: 'pictures' })
// // animalPic.hasMany(animal, { foreignKey: 'Barcode' })
//  const AnimalDetails = <UserModelType>Database.connection.define('SF_Animal_Details', sf_animal_details, { tableName: 'SF_Animal_Details' });
// // animal.belongsToMany(formDetails, { through: { model: AnimalDetails, unique: true }, foreignKey: { name: 'Barcode' }, uniqueKey: 'Barcode' });
// // formDetails.belongsToMany(animal, { through: { model: AnimalDetails, unique: true }, foreignKey: { name: 'detailsId' }, uniqueKey: 'detailsId' });
// // AnimalDetails.hasMany(animal,{ foreignKey: 'barcode'})
// //animal.hasMany(AnimalDetails,{ foreignKey: 'barcode',as:'details'})
// export const dbModel = {
//   client: client,
//   role: role,
//   permission: permission,
//   rolePermission: RolePermission,
//   users: user,
//   userToken: token,
//   clientConfig: clientConfig,
//   animal: animal,
//   animalHistory: animalHistory,
//   animalPic: animalPic,
//   animalType: animalType,
//   animalDetails: AnimalDetails,
//   formDetails: formDetails
// }
// export const modelSmartFarm = Database.modelCreate()
// export default dbModel


//---------******************************-------------///
import Database from '../../common/database'
import createSmartFarmModel, { createAuthModel } from '../../model'
const dbModelAuth = createAuthModel(Database.connection)
const dbModelSmartFarm = createSmartFarmModel(Database.connection)
export default { dbModelAuth, dbModelSmartFarm }