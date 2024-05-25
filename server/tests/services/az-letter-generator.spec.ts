import { AZLetterGenerator } from '../../src/services/az-letter-generator';
import { NumberGenerator } from '../../src/domain/services/number-generator';

describe('AZLetterGenerator', () => {
    let azLetterGenerator: AZLetterGenerator;
    let numberGenerator: NumberGenerator;

    class FakeNumberGenerator implements NumberGenerator {
        public rand!: number;
        public min!: number;
        public max!: number;

        randomInt(min: number, max: number): number {
            this.min = min;
            this.max = max;
            return this.rand;
        }

        setRand(rand: number): void {
            this.rand = rand;
        }
    }

    beforeEach(() => {
        numberGenerator = new FakeNumberGenerator();
        azLetterGenerator = new AZLetterGenerator(numberGenerator);
    });

    it.each([
        [97, 'a'],
        [98, 'b'],
        [99, 'c'],
        [120, 'x'],
        [121, 'y'],
        [122, 'z']
    ])('should return the correct letter', (code: number, letter: string) => {
        (numberGenerator as FakeNumberGenerator).setRand(code);

        expect(azLetterGenerator.getLetter()).toBe(letter);
        expect((numberGenerator as FakeNumberGenerator).min).toBe(97);
        expect((numberGenerator as FakeNumberGenerator).max).toBe(123);
    });
});