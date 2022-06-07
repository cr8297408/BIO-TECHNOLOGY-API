import roles from '@/config/middleware/permissions';
import * as Joi from '@hapi/joi';
import { User } from './model';
import UserValidation from './validation';
import { IUserService } from './interfaces';
import db from '@/config/connection/connectBD';


/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
    /**
     * @returns {Promise <any>}
     * @memberof UserService
     */
    async findAll(bearerHeader): Promise<any> {
        try {
            const permissions = await roles(bearerHeader);
            const module = permissions.nameModules.find((i:string)=> i === 'User')
            if (module) {
                if (permissions.findAll) {
                    console.log(permissions);
                    const users = await db.models.User.findAll();
                    return users;
                } 
            }
            throw new Error('unauthorized');
            
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @returns {Promise < User[] >}
     * @memberof UserService
     */
    async findPagination(sizeAsNumber: number, pageAsNumber: number, bearerHeader: any): Promise<User[]> {
        try {

            let page = 0;
            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0 ) {
                page = pageAsNumber - 1;
            }

            let size = 0;
            if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
                size = sizeAsNumber;
            }

            const permissions = await roles(bearerHeader);
            const module = await permissions.nameModules.find((i:string)=> i === 'User')
            if (module) {
                if (permissions.findPagination) {
                    console.log(permissions);
                    const users: User[] = await User.findAll({
                        limit: size,
                        offset: size * page,
                    })
                    return users
                }
            }
            throw new Error('Unauthorized')
            

        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < User >}
     * @memberof UserService
     */
    async findOne(id: string, bearerHeader): Promise<User> {
        try {
            const permissions = await roles(bearerHeader);
            const module = permissions.nameModules.find((i:string)=> i === 'User')
            if (module) {
                if (permissions.findOne) {
                    const user: User = await User.findByPk(id);
                    
                    if (!user) {
                        throw new Error('user dot not exist');
                    }
        
                    return user;
                }
            } 
            throw new Error('Unauthorized')
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {User} user
     * @returns {Promise < User >}
     * @memberof UserService
     */
    async insert(body, bearerHeader): Promise<any> {
        try {
            const permissions = await roles(bearerHeader);
            const module = permissions.nameModules.find((i:string)=> i === 'User')
            if (module) {
                if (permissions.insert) {
                    const validate: Joi.ValidationResult<User> = UserValidation.createUser(body);
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
        
                    const user = await User.create(body);
                    return user;
                }
            }
            throw new Error('Unauthorized')
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < User >}
     * @memberof UserService
     */
    async remove(id: string, bearerHeader: any): Promise<any> {
        try {
            const permissions = await roles(bearerHeader);
            const module = permissions.nameModules.find((i:string)=> i === 'User')
            if (module) {
                if (permissions.remove) {
                    const validate: Joi.ValidationResult<{
                        id: string;
                    }> = UserValidation.removeUser({
                        id,
                    });
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    const user = await db.query('UPDATE user SET isActive=false WHERE id = ?', {
                        replacements: [id],
                    });
                    return user
                }
            }
            throw new Error('Unauthorized')

        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default UserService;
