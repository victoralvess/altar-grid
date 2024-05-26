import { Grid } from '../models/grid';

export interface GenerateCode {
    generateCode(grid: Grid): string;
}