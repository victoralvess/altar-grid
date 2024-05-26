import { CodeGenerator } from '../domain/services/code-generator';

export class DecimalCodeGenerator implements CodeGenerator {
    getCode(digit1: number, digit2: number): string {
        return this.capDigit(digit1) + this.capDigit(digit2);
    }

    private capDigit(digit: number): string {
        return '' + Math.floor(digit / Math.ceil(digit / 9));
    }
}