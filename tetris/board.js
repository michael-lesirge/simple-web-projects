
export default class Board {
    constructor(width, height) {
        this.width = width ?? 0;
        this.height = height ?? 0;

        this.grid = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
    }

    getGrid() {
        return this.grid;
    }

    getDrawingCopy() {
        const board = new Board();

        board.width = this.width;
        board.height = this.width;
        board.grid = structuredClone(this.grid);

        return board;
    }

    drawGrid(grid, {x = 0, y = 0, width, height, transparentBackground = 1} = {}) {

        x = Math.floor(x);
        y = Math.floor(y);

        height = Math.floor(width ?? grid.length ?? 0);
        width = Math.floor(width ?? (height && grid[0].length) ?? 0);

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                this.grid[y + row][x + col] = (grid[row][col] ?? 0) || (transparentBackground ? this.grid[y + row][x + col] : 0);
            }   
        }
    }
}