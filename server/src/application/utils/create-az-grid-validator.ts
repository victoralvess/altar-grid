import Joi, { type Schema } from 'joi';
import { CreateGridParams, CreateGridValidator } from "../../domain/utils/create-grid-validator";
import { ClientException } from '../../domain/exceptions/client-exception';

export class CreateAZGridValidator implements CreateGridValidator {
    private readonly schema: Schema<CreateGridParams>;

    constructor() {
        this.schema = Joi.object({
            size: Joi.number().min(1),
            bias: Joi.string().regex(/^[a-z]$/).allow(null)
        });
    }

    validateParams(params: CreateGridParams): CreateGridParams | never {
        const value = this.schema.validate(params);

        if (value.error !== undefined) {
            throw new ClientException(value.error.message);
        }

        return value.value;
    }
}