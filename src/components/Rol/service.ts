import { DataTypes } from 'sequelize';
import { IRolService, IRolModel } from './interfaces';
import db from '../../config/connection/connectBD';
import RolModel from './model';

/**
 * @export
 * @implements {IRolService}
 */

const RolService: IRolService = {

    /**
     * @returns {Promise<IRolModel[]>}
     * @memberof RolService
     */

    async findAll(): Promise<IRolModel[]> {
        try {
            const roles: IRolModel[] = await RolModel(db, DataTypes).findAll();

            return roles;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
}


export default RolService;
