import { Grid } from '../models/grid';

export interface GetCode {
    getCode(grid: Grid): string;
}