import Joi, { type Schema } from 'joi';
import { Grid } from '../../domain/models/grid';
import { GridValidator } from '../../domain/utils/grid-validator';
import { InvalidGridException } from '../../domain/exceptions/invalid-grid-exception';

export class AZGridValidator implements GridValidator {
    private readonly schema: Schema<Grid>;

    constructor(size: number) {
        assert(size > 0);
        const rows = Joi.array().items(Joi.string().regex(/^[a-z]$/)).length(size);
        this.schema = Joi.array().items(rows).length(size);
    }

    validateGrid(grid: Grid): Grid | never {
        const value = this.schema.validate(grid);

        if (value.error !== undefined) {
            throw new InvalidGridException(value.error.message);
        }

        return value.value;
    }
}