import * as express from 'express';
import * as Controller from '../controller/SmartFarmController'
const router = express.Router();

router.post('/animal/create', Controller.createAnimal)
router.put('/animal/update', Controller.updateAnimal)
router.get('/animal/view', Controller.getAnimals)
router.get('/animal/view/:barcode', Controller.getAnimalsByBarcode)
router.delete('/animal/:barcode', Controller.deleteAnimalsByBarcode)

router.get('/animal/type', Controller.getAnimalsType)
router.get('/animal/form/details', Controller.getFormDetails)
router.get('/animal/pictures/:barcode/:id/:filename', Controller.getAnimalsPicture)
router.delete('/animal/pictures/:id', Controller.deleteAnimalsPicture)

router.post('/animal/history/create', Controller.recordHistoryAnimal)
router.get('/farm/summary', Controller.getSummaryFarm)

export default router;