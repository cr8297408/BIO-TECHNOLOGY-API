import db  from '../../config/connection/connectBD';
import { DataTypes } from 'sequelize';
import * as Joi from '@hapi/joi';
import UserModel, { IUserModel } from './model';
import UserValidation from './validation';
import { IUserService } from './interfaces';


/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
    /**
     * @returns {Promise < IUserModel[] >}
     * @memberof UserService
     */
    async findAll(): Promise<IUserModel[]> {
        try {
            const users: IUserModel[] = await UserModel(db, DataTypes).findAll();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @returns {Promise < IUserModel[] >}
     * @memberof UserService
     */
    async findPagination(sizeAsNumber: number, pageAsNumber: number): Promise<IUserModel[]> {
        try {

            let page = 0;
            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0 ) {
                page = pageAsNumber - 1;
            }

            let size = 0;
            if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
                size = sizeAsNumber;
            }

            const users: IUserModel[] = await UserModel(db, DataTypes).findAll({
                limit: size,
                offset: size * page,
            })
            console.log(size, page);
            
            return users
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async findOne(id: string): Promise<IUserModel> {
        try {
            const user: IUserModel = await UserModel(db, DataTypes).findByPk(id);

            if (!user) {
                throw new Error('user dot not exist');
            }

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IUserModel} user
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async insert(body: IUserModel): Promise<IUserModel> {
        try {


            const validate: Joi.ValidationResult<IUserModel> = UserValidation.createUser(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IUserModel = await UserModel(db, DataTypes).create(body)

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async remove(id: string): Promise<IUserModel> {
        try {
            const validate: Joi.ValidationResult<{
                id: string;
            }> = UserValidation.removeUser({
                id,
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            await db.query('UPDATE users SET isActive=false WHERE id = ?', {
                replacements: [id],
            });
            
            const user = await UserModel(db, DataTypes).findByPk(id);
            // await user.update({
            //     isActive: false,
            // })
            
            return user

        
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default UserService;
