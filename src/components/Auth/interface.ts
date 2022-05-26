import { User } from '@/components/User/model';

/**
 * @export
 * @interaface IAuthService
 */
export interface IAuthService {
    /**
     * @param {User} User
     * @returns {Promise<User>}
     * @memberof AuthService
     */
    createUser(User: User): Promise<User>;
    /**
     * @param {User} User
     * @returns {Promise<User>}
     * @memberof AuthService
     */
    getUser(User: User): Promise<any>;
}
