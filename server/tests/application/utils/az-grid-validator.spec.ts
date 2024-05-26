import { AZGridValidator } from '../../../src/application/utils/az-grid-validator';
import { InvalidGridException } from '../../../src/domain/exceptions/invalid-grid-exception';
import { Grid } from '../../../src/domain/models/grid';

describe('AZGridValidator', () => {
    let gridValidator: AZGridValidator;
    let validGrid: Grid;

    beforeEach(() => {
        gridValidator = new AZGridValidator(2);
        validGrid = [['a', 'b'], ['c', 'd']];
    });

    it.each([{ grid: [] }, { grid: [[]] }])(
        'should throw an exception if the grid format is invalid',
         ({ grid }: { grid: Grid }) => {
            expect(() => gridValidator.validateGrid(grid)).to.throw(InvalidGridException);
        }
    );

    it.each([[0, 0, 'A'], [1, 0, 'Z'], [1, 1, 'aa']])(
        'should throw an exception if the grid contains an invalid character',
         (i: number, j: number, c: string) => {
            const grid = structuredClone(validGrid);
            grid[i][j] = c;

            expect(() => gridValidator.validateGrid(grid)).to.throw(InvalidGridException);
        }
    );

    it('should return the validated grid if the input grid is valid', () => {
        expect(gridValidator.validateGrid(validGrid)).toEqual(validGrid);
    });
});