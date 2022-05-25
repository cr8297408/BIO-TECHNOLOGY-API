import { IRolModel } from './interfaces';
import { HttpError } from '../../config/error/index';
import { NextFunction, Request, Response } from 'express';
import RolService from './service';



/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns { Promise<void> }
 */

export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        
        const roles: IRolModel[] = await RolService.findAll();

        res.status(200).json(roles);

    } catch (error) {
        next(new HttpError(error.message.status, error.message))
    }
}