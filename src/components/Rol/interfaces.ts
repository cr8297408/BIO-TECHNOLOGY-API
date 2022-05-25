/**
 * @export
 * @interface IRolModel
 */

export interface IRolModel {
    id: string,
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
    // add modules of the api
    User: {
        // add actions of the module
        findAll: boolean,
        findPagination: boolean,
        findOne: boolean,
        insert: boolean,
        remove: boolean,
    }
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
    findAll(): Promise<IRolModel[]>;

    // /**
    //  * @returns {Promise<IRolModel[]>}
    //  * @memberof IRolService
    //  */
    // findPagination(size: number, page: number): Promise<IRolModel[]>;

    // /**
    //  * @returns {Promise<IRolModel>}
    //  * @memberof IRolService
    //  */
    // findOne(id: string): Promise<IRolModel>;

    // /**
    //  * @returns {Promise<IRolModel>}
    //  * @memberof IRolService
    //  */
    // insert(IRolModel: IRolModel): Promise<IRolModel>;

    // /**
    //  * @returns {Promise<IRolModel>}
    //  * @memberof IRolService
    //  */
    // remove(id: string): Promise<IRolModel>;

    // /**
    //  * @returns {Promise<IRolModel>}
    //  * @memberof IRolService
    //  */
    // update(id: string): Promise<IRolService>;
}