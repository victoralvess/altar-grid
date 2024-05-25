import { GridGenerator } from '../domain/services/grid-generator';
import { RandomLetterGenerator } from '../domain/services/random-letter-generator';
import { NumberGenerator } from '../domain/services/number-generator';

export class NGridGenerator implements GridGenerator {
    constructor(
        private readonly randomLetterGenerator: RandomLetterGenerator,
        private readonly numberGenerator: NumberGenerator
    ) { }

    makeGrid(size: number, bias: string | null): string[][] {
        const grid: string[][] = [];
        const biased: Set<number> = this.randBias(bias, size);

        for (let i = 0; i < size; i++) {
            grid.push(new Array(size).fill(null));

            for (let j = 0; j < size; j++) {
                // 1d position based on the 2d coordinates
                const position = i * size + ((i * size) % size + j);

                if (biased.has(position)) {
                    grid[i][j] = bias!;
                } else {
                    grid[i][j] = this.randomLetterGenerator.getLetter();
                }
            }
        }

        return grid;
    }

    private randBias(bias: string | null, size: number): Set<number> {
        const biased: Set<number> = new Set();
        if (bias === null) {
            return biased;
        }

        // 20% of the grid should include the bias character
        let counter = Math.ceil(0.2 * size * size);

        while (counter > 0) {
            const randInt = this.numberGenerator.randomInt(0, size);

            if (biased.has(randInt)) {
                continue;
            }

            counter--;
            biased.add(randInt);
        }

        return biased;
    }

    calcCode(grid: string[][]): string {
        throw new Error('Method not implemented.');
    }
}