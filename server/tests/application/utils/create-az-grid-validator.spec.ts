
import { CreateAZGridValidator } from '../../../src/application/utils/create-az-grid-validator';
import { ClientException } from '../../../src/domain/exceptions/client-exception';

describe('CreateAZGridValidator', () => {
    let gridValidator: CreateAZGridValidator;

    beforeEach(() => {
        gridValidator = new CreateAZGridValidator();
    });

    it.each([-2, -1, 0])(
        'should throw an exception if the size is invalid',
         (size: number) => {
            const params = { size, bias: null }

            expect(() => gridValidator.validateParams(params)).to.throw(ClientException);
        }
    );

    it.each(['A', 'aa', 'Z', 'zz'])(
        'should throw an exception if the bias is invalid',
        (bias: string) => {
            const params = { size: 2, bias }

            expect(() => gridValidator.validateParams(params)).to.throw(ClientException);
        }
    );

    it('should return the validated params if the input params are valid', () => {
        const params = { size: 2, bias: 'a' }

        expect(gridValidator.validateParams(params)).toEqual(params);
    });
});