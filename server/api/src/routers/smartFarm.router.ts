import * as express from 'express';
import * as Controller from '../controller/SmartFarmController'
const router = express.Router();
router.get('/animal/view',Controller.getAnimals)
router.post('/animal/create',Controller.createAnimal)
router.put('/animal/update',Controller.updateAnimal)
router.post('/animal/history/create',Controller.recordHistoryAnimal)
export default router;