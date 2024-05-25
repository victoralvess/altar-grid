import { DecimalCodeGenerator } from '../../src/services/decimal-code-generator';
describe('DecimalCodeGenerator', () => {
    let decimalCodeGenerator: DecimalCodeGenerator;

    beforeEach(() => {
        decimalCodeGenerator = new DecimalCodeGenerator();
    });

    it.each([
        [1, 1, '11'],
        [4, 5, '45'],
        [6, 5, '65'],
        [8, 8, '88'],
        [9, 9, '99'],
        [10, 10, '55'],
        [10, 9, '59'],
        [15, 19, '76'],
    ])(
        'should return the right code based on the given digits',
        (digit1: number, digit2: number, code: string) => {
            expect(decimalCodeGenerator.getCode(digit1, digit2)).toBe(code);
        }
    );
});