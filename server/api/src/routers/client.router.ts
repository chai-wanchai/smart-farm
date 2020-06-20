import * as express from 'express';
import Middelware from '../manager/Middleware'
import { registerClient } from '../controller/RegisterController';
import { RegisterClientValidation, ClientValidation } from '../validation/ClientValidation';
import * as ClientController from '../controller/ClientController';
const router = express.Router();

router.get('/client', Middelware.handleClientFromeRequet, ClientController.getClientInformation)
router.get('/client/search', ClientValidation, ClientController.getAllClient)
router.post('/client', Middelware.handleToken, RegisterClientValidation, registerClient)
router.patch('/client', Middelware.handleToken, ClientValidation, ClientController.updateClient)
router.delete('/client', Middelware.handleToken, ClientValidation, ClientController.deleteClient)

router.post('/client/config', Middelware.handleClientFromeRequet, ClientController.addClientConfig)
router.patch('/client/config', Middelware.handleClientFromeRequet, ClientController.editClientConfig)
export default router