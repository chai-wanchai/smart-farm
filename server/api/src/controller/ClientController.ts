import { Response, Request, NextFunction } from 'express'
import manager from '../manager'
import * as _ from 'lodash'
import AuthManager from '../manager/AuthManager'
import { ErrorHandle, IError, CommonError } from '../common/errorHandle';
import { UserAttributes } from '../types/users'
import { IToken } from '../types/token';
import { IClient } from '../types/client';

export async function updateClient(req: Request, res: Response, next: NextFunction) {
  try {
    const userPayload: IToken = res.locals.payload
    const client: IClient = res.locals.client
    const data: IClient = req.body
    const result = await manager.client.updateClient(client.clientId!, data.clientName!, userPayload.sub, data.description, data.isActive)
    res.json(result)
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
export async function deleteClient(req: Request, res: Response, next: NextFunction) {
  try {
    const client: IClient = res.locals.client
    const result = await manager.client.deleteClient(client.clientId!)
    res.json(result)
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
export async function getClientInformation(req: Request, res: Response, next: NextFunction) {
  try {
    const result = res.locals.client
    res.json(result)
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
export async function getAllClient(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await manager.client.getAllClient()
    res.json(result)
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
export async function addClientConfig(req: Request, res: Response, next: NextFunction) {
  try {
    const userPayload: IToken = res.locals.payload
    const data = req.body
    const result = await manager.client.addConfigClient(userPayload.client_id, data.configCode, data.configValue, userPayload.sub, data.isActive)
    res.json(result)
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
export async function editClientConfig(req: Request, res: Response, next: NextFunction) {
  try {
    const userPayload: IToken = res.locals.payload
    const data = req.body
    const result = await manager.client.editConfigClient(userPayload.client_id, data.configCode, data.configValue, userPayload.sub, data.isActive)
    res.json(result)
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}