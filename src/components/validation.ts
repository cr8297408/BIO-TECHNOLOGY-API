import * as Joi from '@hapi/joi';

/**
 * @export
 * @class Validation
 */
abstract class Validation {
    // can`t assign to customJoi any type of Joi Schemas - because of custom field objectId. Need to discuss this
    customJoi: any;

    /**
     * @static
     * @type {string}
     * @memberof JoiSchema
     */
    readonly messageObjectId: string = 'Argument passed in must be a String';

    /**
     * Creates an instance of Schema.
     * @memberof JoiSchema
     */
    constructor() {
        this.customJoi = Joi.extend((joi: Joi.Context) => ({
            type: 'string',
            base: joi.string(),
            messages: {
                objectId: this.messageObjectId,
            },
            validate(value: any, helpers: Joi.Context): any {
                if (typeof(value) !== 'string') {
                    return { value: value, errors: helpers.error('objectId') };
                }
            },
        }));
    }
}

export default Validation;
