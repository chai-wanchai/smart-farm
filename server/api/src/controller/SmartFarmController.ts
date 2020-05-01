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
	
		res.json({})
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function recordHistoryAnimal(req: Request, res: Response, next: NextFunction) {
	try {	
		res.json({})
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}