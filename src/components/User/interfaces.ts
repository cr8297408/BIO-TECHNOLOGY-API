import {User} from "./model";

/**
 * @export
 * @interface IUserModel
 */

export interface IProfileUser {
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
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
     * @returns {Promise<User[]>}
     * @memberof IUserService
     */
    findAll(): Promise<User[]>;

    /**
     * @returns {Promise<User[]>}
     * @memberof IUserService
     */
    findPagination(size: number, page: number): Promise<User[]>;

    /**
     * @param {string} code
     * @returns {Promise<User>}
     * @memberof IUserService
     */
    findOne(code: string): Promise<User>;

    /**
     * @param {User} User
     * @returns {Promise<User>}
     * @memberof IUserService
     */
    insert(IUserModel: User): Promise<User>;

    /**
     * @param {string} id
     * @returns {Promise<User>}
     * @memberof IUserService
     */
    remove(id: string): Promise<User>;
}
