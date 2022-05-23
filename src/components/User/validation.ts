import * as Joi from '@hapi/joi';
// import Validation from '@/components/validation';
import { IUserModel } from './model';

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation /**extends Validation**/ {
    /**
     * Creates an instance of UserValidation.
     * @memberof UserValidation
     */

    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                })
                .required(),
            password: Joi.string().required()
        });

        return schema.validate(params);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    getUser(body: {
        id: string;
    }): Joi.ValidationResult<{
        id: string;
    }> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: Joi.string().required(),
        });

        return schema.validate(body);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    removeUser(body: {
        id: string;
    }): Joi.ValidationResult<{
        id: string;
    }> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: Joi.string().required(),
                     // esto hay que validarlo bien mas adelante
        });

        return schema.validate(body);
    }
}

export default new UserValidation();
