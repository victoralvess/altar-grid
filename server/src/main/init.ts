import { randomInt } from 'node:crypto';
import { CreateGridImpl } from '../application/use-cases/create-grid-impl';
import { GridGenerator } from '../domain/services/grid-generator';
import { CreateGrid } from '../domain/use-cases/create-grid';
import { AZLetterGenerator } from '../services/az-letter-generator';
import { NGridGenerator } from '../services/n-grid-generator';
import { NumberGenerator } from '../domain/services/number-generator';
import { SystemClock } from '../services/system-clock';
import { DecimalCodeGenerator } from '../services/decimal-code-generator';
import { CreateAZGridValidator } from '../application/utils/create-az-grid-validator';
import { GenerateCode } from '../domain/use-cases/generate-code';
import { GenerateCodeImpl } from '../application/use-cases/generate-code-impl';
import { AZGridValidator } from '../application/utils/az-grid-validator';

const numberGenerator: NumberGenerator = { randomInt };
const gridGenerator: GridGenerator = new NGridGenerator(
    new AZLetterGenerator(numberGenerator),
    numberGenerator,
    new SystemClock(),
    new DecimalCodeGenerator()
);

export const createGrid: CreateGrid = new CreateGridImpl(
    gridGenerator,
    new CreateAZGridValidator()
);

export const GRID_SIZE = 10;

export const generateCode: GenerateCode = new GenerateCodeImpl(
    gridGenerator,
    new AZGridValidator(GRID_SIZE)
);