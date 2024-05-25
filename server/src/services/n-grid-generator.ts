import { GridGenerator } from '../domain/services/grid-generator';
import { RandomLetterGenerator } from '../domain/services/random-letter-generator';

export class NGridGenerator implements GridGenerator {
    constructor(
        private readonly randomLetterGenerator: RandomLetterGenerator,
    ) { }

    makeGrid(size: number, bias: string | null): string[][] {
        const grid: string[][] = []

        for (let i = 0; i < size; i++) {
            grid.push([]);

            for (let j = 0; j < size; j++) {
                grid[i].push(this.randomLetterGenerator.getLetter())
            }
        }

        return grid
    }

    calcCode(grid: string[][]): string {
        throw new Error('Method not implemented.');
    }
}