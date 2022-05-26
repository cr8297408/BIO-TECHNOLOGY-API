import * as Joi from '@hapi/joi';
import Validation from '@/components/validation';
import {User} from '@/components/User/model';

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * Creates an instance of AuthValidation.
     * @memberof AuthValidation
     */
    constructor() {
        super();
    }
    /**
     * @param {User} params
     * @returns {Joi.ValidationResult<User >}
     * @memberof UserValidation
     */
    createUser(params: User): Joi.ValidationResult<User> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            name: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                })
                .required(),
            facebook: Joi.string().required(),
        });

        return schema.validate(params);
    }
    /**
     * @param {User} params
     * @returns {Joi.ValidationResult<User >}
     * @memberof UserValidation
     */
    getUser(params: User): Joi.ValidationResult<User> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                })
                .required(),
        });

        return schema.validate(params);
    }
}

export default new AuthValidation();
