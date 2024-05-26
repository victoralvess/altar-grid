import { Grid } from '../models/grid';

export interface GridValidator {
    validateGrid(grid: Grid): Grid | never;
}