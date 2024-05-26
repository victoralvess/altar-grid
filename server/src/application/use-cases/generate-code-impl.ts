import { Grid } from '../../domain/models/grid';
import { GridGenerator } from '../../domain/services/grid-generator';
import { GenerateCode } from '../../domain/use-cases/generate-code';
import { GridValidator } from '../../domain/utils/grid-validator';

export class GenerateCodeImpl implements GenerateCode {
    constructor(
        private readonly gridGenerator: GridGenerator,
        private readonly gridValidator: GridValidator
    ) { }

    generateCode(grid: Grid): string {
        const validGrid = this.gridValidator.validateGrid(grid);
        return this.gridGenerator.calcCode(validGrid);
    }
}