import config from '@/config/env/index';
import db from '@/config/connection/connectBD';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { IUserRequest } from '@/components/User/interfaces';
import HttpError from '@/config/error';
import AuthService from './service';
import app from '@/config/server/server';
import {User} from '../User/model';

interface RequestWithUser extends Request {
    user: IUserRequest;
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await AuthService.createUser(req.body);
        
        res.status(HttpStatus.OK)
            .send({
                message: 'You have signed up successfully',
            });
    } catch (error) {
        if (error.code === HttpStatus.INTERNAL_SERVER_ERROR) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.status(HttpStatus.BAD_REQUEST)
            .send({
                message: error.message,
            });
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user = await AuthService.getUser(req.body);

        if(user){
            const dataUser:User = user[0][0];
            const token: string = jwt.sign({ id: dataUser.id, idRol: dataUser.idRol, isAdmin: dataUser.isAdmin, isActive: dataUser.isActive }, app.get('secret'), {
                expiresIn: '60m',
            });

            await db.query('UPDATE user SET token=? WHERE id = ?', {
                replacements: [token, dataUser.id],
            });
            res.status(HttpStatus.OK)
                .header({
                    Authorization: token,
                })
                .send({
                    message: 'Login Success!',
                });
        } else {
            res.status(401).json('usuario no registrado.')
        }

    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.status(HttpStatus.BAD_REQUEST)
            .send({
                message: error.message,
            });
    }
}

/**
 * @export
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function user(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        if (token){
            const decoded: any = await jwt.verify(token, config.JWT_SECRET);
            if (decoded) {
                const user: User = await User.findByPk(decoded.id);
                res.status(HttpStatus.OK)
                    .send({ user });            
            } 
        }
    } catch (error) {
        if (error.code === HttpStatus.INTERNAL_SERVER_ERROR) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.status(HttpStatus.BAD_REQUEST)
            .send({
                message: error.message,
            });
    }
}
