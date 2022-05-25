/**
 * @export
 * @interface IUserModel
 */

 export interface IUserModel {
    id: string;
    email: string;
    name: string;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    facebook?: string;
    token?: string;
    isActive?: boolean;
}

/**
 * @export
 * @interface IUserRequest
 */
 export interface IUserRequest {
    id: string;
    email: string;
}

/**
 * @export
 * @interface IUserService
 */


export interface IUserService {
    /**
     * @returns {Promise<IUserModel[]>}
     * @memberof IUserService
     */
    findAll(): Promise<IUserModel[]>;

    /**
     * @returns {Promise<IUserModel[]>}
     * @memberof IUserService
     */
    findPagination(size: number, page: number): Promise<IUserModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    findOne(code: string): Promise<IUserModel>;

    /**
     * @param {IUserModel} IUserModel
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    insert(IUserModel: IUserModel): Promise<IUserModel>;

    /**
     * @param {string} id
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    remove(id: string): Promise<IUserModel>;
}
