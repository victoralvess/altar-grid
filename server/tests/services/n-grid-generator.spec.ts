
import { Mocked } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { RandomLetterGenerator } from '../../src/domain/services/random-letter-generator';
import { NGridGenerator } from '../../src/services/n-grid-generator';

describe('NGridGenerator', () => {
    let nGridGenerator: NGridGenerator;
    let randomLetterGenerator: Mocked<RandomLetterGenerator>;

    beforeEach(() => {
        randomLetterGenerator = mock<RandomLetterGenerator>();
        nGridGenerator = new NGridGenerator(randomLetterGenerator);
    });

    describe('#makeGrid', () => {
        it('should return an NxN grid of random characters', () => {
            const N = 3;
            const grid = [
                ['a', 'b', 'c'],
                ['g', 'h', 'i'],
                ['d', 'e', 'f']
            ];

            randomLetterGenerator.getLetter
                .mockReturnValueOnce('a')
                .mockReturnValueOnce('b')
                .mockReturnValueOnce('c')
                .mockReturnValueOnce('g')
                .mockReturnValueOnce('h')
                .mockReturnValueOnce('i')
                .mockReturnValueOnce('d')
                .mockReturnValueOnce('e')
                .mockReturnValueOnce('f');

            expect(nGridGenerator.makeGrid(N, null)).toEqual(grid);
            expect(randomLetterGenerator.getLetter).toHaveBeenCalledTimes(9);
        });
    });
});