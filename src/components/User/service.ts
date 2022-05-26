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
    async findAll(): Promise<any> {
        try {
            const users = await db.models.User.findAll();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @returns {Promise < User[] >}
     * @memberof UserService
     */
    async findPagination(sizeAsNumber: number, pageAsNumber: number): Promise<User[]> {
        try {

            let page = 0;
            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0 ) {
                page = pageAsNumber - 1;
            }

            let size = 0;
            if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
                size = sizeAsNumber;
            }

            const users: User[] = await User.findAll({
                limit: size,
                offset: size * page,
            })
            
            return users
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < User >}
     * @memberof UserService
     */
    async findOne(id: string): Promise<User> {
        try {
            const user: User = await User.findByPk(id);
            console.log(user);
            
            if (!user) {
                throw new Error('user dot not exist');
            }

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {User} user
     * @returns {Promise < User >}
     * @memberof UserService
     */
    async insert(body): Promise<any> {
        try {


            const validate: Joi.ValidationResult<User> = UserValidation.createUser(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user = await User.create({body});
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < User >}
     * @memberof UserService
     */
    async remove(id: string): Promise<any> {
        try {
            const validate: Joi.ValidationResult<{
                id: string;
            }> = UserValidation.removeUser({
                id,
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }
            
            // const user = await User.update({isActive: false} , {where: {id}})
            const user = await db.query('UPDATE user SET isActive=false WHERE id = ?', {
                replacements: [id],
            });
            return user

        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default UserService;
