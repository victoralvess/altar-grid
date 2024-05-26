import { NumberGenerator } from '../domain/services/number-generator';
import { RandomLetterGenerator } from '../domain/services/random-letter-generator';

export class AZLetterGenerator implements RandomLetterGenerator {
    constructor(private readonly numberGenerator: NumberGenerator) { }

    getLetter(): string {
        return String.fromCharCode(this.numberGenerator.randomInt(97, 123));
    }
}