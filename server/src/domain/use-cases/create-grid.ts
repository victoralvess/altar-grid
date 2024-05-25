import { Grid } from '../models/grid';

export interface CreateGrid {
    createGrid(size: number, bias: string | null): Grid;
}