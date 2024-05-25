
import { Mocked } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { RandomLetterGenerator } from '../../src/domain/services/random-letter-generator';
import { NGridGenerator } from '../../src/services/n-grid-generator';
import { NumberGenerator } from '../../src/domain/services/number-generator';

describe('NGridGenerator', () => {
    let nGridGenerator: NGridGenerator;
    let randomLetterGenerator: Mocked<RandomLetterGenerator>;
    let numberGenerator: Mocked<NumberGenerator>;

    beforeEach(() => {
        randomLetterGenerator = mock<RandomLetterGenerator>();
        numberGenerator = mock<NumberGenerator>();
        nGridGenerator = new NGridGenerator(
            randomLetterGenerator,
            numberGenerator
        );
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

        it('should return a biased grid', () => {
            const N = 5;
            const bias = 'z';

            const grid = [
                ['z', 'b', 'c', 'd', 'e'],
                ['f', 'g', 'z', 'i', 'j'],
                ['k', 'z', 'm', 'n', 'o'],
                ['p', 'q', 'r', 's', 'z'],
                ['z', 'v', 'w', 'x', 'y']
            ];

            randomLetterGenerator.getLetter
                .mockReturnValueOnce('b')
                .mockReturnValueOnce('c')
                .mockReturnValueOnce('d')
                .mockReturnValueOnce('e')
                .mockReturnValueOnce('f')
                .mockReturnValueOnce('g')
                .mockReturnValueOnce('i')
                .mockReturnValueOnce('j')
                .mockReturnValueOnce('k')
                .mockReturnValueOnce('m')
                .mockReturnValueOnce('n')
                .mockReturnValueOnce('o')
                .mockReturnValueOnce('p')
                .mockReturnValueOnce('q')
                .mockReturnValueOnce('r')
                .mockReturnValueOnce('s')
                .mockReturnValueOnce('v')
                .mockReturnValueOnce('w')
                .mockReturnValueOnce('x')
                .mockReturnValueOnce('y');

            numberGenerator.randomInt
                .mockReturnValueOnce(0)
                .mockReturnValueOnce(7)
                .mockReturnValueOnce(7) // repeated
                .mockReturnValueOnce(11)
                .mockReturnValueOnce(19)
                .mockReturnValueOnce(19) // repeated
                .mockReturnValueOnce(11) // repeated
                .mockReturnValueOnce(20);

            expect(nGridGenerator.makeGrid(N, bias)).toEqual(grid);
            expect(randomLetterGenerator.getLetter).toHaveBeenCalledTimes(20);
            expect(numberGenerator.randomInt).toHaveBeenCalledTimes(8);
            expect(numberGenerator.randomInt).toHaveBeenCalledWith(0, N);
        });
    });
});