/**
 * @export
 * @interface IRolModel
 */

export interface IRolModel {
    id?: string,
    name: string,
    permissions: IPermissions,
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * @export
 * @interface IPermissions
 */

export interface IPermissions {
    // add actions of the module
    nameModules: Array<string>,
    findAll: boolean,
    findPagination: boolean,
    findOne: boolean,
    insert: boolean,
    remove: boolean,
}

/**
 * @export
 * @interface IRolService
 */

export interface IRolService {

    /**
     * @returns {Promise<IRolModel[]>}
     * @memberof IRolService
     */
    findAll(): Promise<IRolModel[]>
}