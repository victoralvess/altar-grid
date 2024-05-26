import { Grid } from '../../domain/models/grid';
import { GridGenerator } from '../../domain/services/grid-generator';
import { CreateGrid } from '../../domain/use-cases/create-grid';
import { CreateGridValidator } from '../../domain/utils/create-grid-validator';

export class CreateGridImpl implements CreateGrid {
    constructor(
        private readonly gridGenerator: GridGenerator,
        private readonly createGridValidator: CreateGridValidator
    ) { }

    createGrid(size: number, bias: string | null): Grid {
        const params = this.createGridValidator.validateParams({ size, bias });
        return this.gridGenerator.makeGrid(params.size, params.bias);
    }
}