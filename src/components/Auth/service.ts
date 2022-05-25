import db from '../../config/connection/connectBD';
import { DataTypes, QueryTypes } from 'sequelize';
import * as Joi from '@hapi/joi';
import AuthValidation from './validation';
import UserModel from '@/components/User/model';
import { IAuthService } from './interface';
import comparePassword from '../../config/middleware/user.middleware';
import { IUserModel } from '../User/interfaces';

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {
    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    async createUser(body: IUserModel): Promise<IUserModel> {
        try {
            const validate: Joi.ValidationResult<IUserModel> = AuthValidation.createUser(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            
            const query = await db.query('SELECT * FROM user WHERE email= ? ', {
                replacements: [body.email],
                type: QueryTypes.SELECT,
            });
            
            if (query.length!=0) {
                throw new Error('This email already exists');
            }
            
            const user: IUserModel = await UserModel(db, DataTypes).create(body);

            return user;
        } catch (error) {
            throw new Error(error);
        }
    },
    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    async getUser(body: IUserModel): Promise<any> {
        try {
            const validate: Joi.ValidationResult<IUserModel> = AuthValidation.getUser(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user = await db.query('SELECT * FROM user WHERE email= ? ', {
                replacements: [body.email]
            });
            console.log(user);
            
            if (user[0].length !== 0) {
                const isMatched: boolean = user && (await comparePassword(body));
    
                if (isMatched) {
                    return user;
                }
                throw new Error('Invalid password or email');
            } else { return null }

        } catch (error) {
            throw new Error(error);
        }
    },
};

export default AuthService;
