export interface GridGenerator {
    makeGrid(size: number, bias: string | null): string[][];
    calcCode(grid: string[][]): string;
}