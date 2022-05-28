import db from '../../config/connection/connectBD';
import { QueryTypes } from 'sequelize';
import * as Joi from '@hapi/joi';
import AuthValidation from './validation';
import { IAuthService } from './interface';
import comparePassword from '../../config/middleware/user.middleware';
import {User}  from '../User/model';

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {
    /**
     * @param {User} body
     * @returns {Promise <User>}
     * @memberof AuthService
     */
    async createUser(body): Promise<User> {
        try {
            const validate: Joi.ValidationResult<User> = AuthValidation.createUser(body);

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
            
            const user = await User.create(body);        

            return user;
        } catch (error) {
            throw new Error(error);
        }
    },
    /**
     * @param {User} body
     * @returns {Promise <User>}
     * @memberof AuthService
     */
    async getUser(body: User): Promise<any> {
        try {
            const validate: Joi.ValidationResult<User> = AuthValidation.getUser(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user = await db.query('SELECT * FROM user WHERE email= ? ', {
                replacements: [body.email]
            });
            
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
