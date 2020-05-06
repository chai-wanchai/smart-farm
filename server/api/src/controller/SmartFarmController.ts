import { Response, Request, NextFunction } from 'express'
import manager from '../manager'
import { ErrorHandle } from '../common/errorHandle'
import * as _ from 'lodash'
export async function getAnimals(req: Request, res: Response, next: NextFunction) {
	try {
		const result: any = await manager.smartfarm.getAnimals()
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function getAnimalsType(req: Request, res: Response, next: NextFunction) {
	try {
		const result: any = await manager.smartfarm.getAnimalsType()
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function getFormDetails(req: Request, res: Response, next: NextFunction) {
	try {
		const result: any = await manager.smartfarm.getFormDetails()
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function getAnimalsByBarcode(req: Request, res: Response, next: NextFunction) {
	try {
		const barcode = req.params.barcode
		const result: any = await manager.smartfarm.getAnimals(barcode)
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function deleteAnimalsByBarcode(req: Request, res: Response, next: NextFunction) {
	try {
		const barcode = req.params.barcode
		const result: any = await manager.smartfarm.deleteAnimalsByBarcode(barcode)
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function createAnimal(req: Request, res: Response, next: NextFunction) {
	try {
		const result: any = await manager.smartfarm.createAnimal(req.body)
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function updateAnimal(req: Request, res: Response, next: NextFunction) {
	try {
		const result: any = await manager.smartfarm.updateAnimal(req.body)
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function recordHistoryAnimal(req: Request, res: Response, next: NextFunction) {
	try {
		const result: any = await manager.smartfarm.createAnimalHistory(req.body)
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function getAnimalsPicture(req: Request, res: Response, next: NextFunction) {
	try {
		const barcode = req.params.barcode
		const id = parseInt(req.params.id)
		const filename = req.params.filename
		const result = await manager.smartfarm.getAnimalPictures(id, barcode, filename)
		if (result.Picture) {
			const imgBase64 = Buffer.from(result.Picture).toString()
			const imgMeta = imgBase64.split(",");
			const imgSend = Buffer.from(imgMeta[1], 'base64');
			res.writeHead(200, {
				'Content-Length': imgSend.length
			});
			res.end(imgSend);
		} else {
			res.status(400).end()
		}

	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function deleteAnimalsPicture(req: Request, res: Response, next: NextFunction) {
	try {
		const id = parseInt(req.params.id)
		const result = await manager.smartfarm.deleteAnimalPictures(id)
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function getSummaryFarm(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await manager.smartfarm.getSummaryFarm()
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}