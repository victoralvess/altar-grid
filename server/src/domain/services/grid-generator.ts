import { Grid } from '../models/grid';

export interface GridGenerator {
    makeGrid(size: number, bias: string | null): Grid;
    calcCode(grid: Grid): string;
}