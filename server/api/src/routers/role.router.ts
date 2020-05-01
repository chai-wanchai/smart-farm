import * as express from 'express';
import Middelware from '../manager/Middleware'
import * as RoleController from '../controller/RoleController'
export const router = express.Router();

router.post('/role', Middelware.handleToken, RoleController.addRole)
//router.post('/role/user', Middelware.handleToken, RoleController.addRolePermission);
router.post('/role/client', Middelware.handleToken, RoleController.addClientRole);
//router.post('/role/permission', Middelware.handleToken, RoleController.addRolePermission)
//router.post('/permission', Middelware.handleToken, RoleController.addPermission)
export default router;