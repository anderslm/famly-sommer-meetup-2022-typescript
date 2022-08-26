
type Cell = { x: number, y: number }
type Grid = Cell[]

export function tick(grid: Grid = [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}]) {
	return grid
		.flatMap(cell => {
			let newGrid: Grid = [];
			switch(numberOfNeighbours(grid, cell)) {
				case 2: case 3: newGrid = [cell]
			}
			return newGrid
				.concat(neighbours(cell).filter(c => grid.indexOf(c) == -1).map(c => numberOfNeighbours(grid, c) == 3 ? c : null)
				.filter(c => c) as Grid)
		})
		.filter(c => c)
}

function neighbours(c: Cell): Grid {
	return [{x: c.x + 1, y: c.y + 1}, {x: c.x - 1, y: c.y - 1}, {x: c.x - 1, y: c.y + 1}, {x: c.x + 1, y: c.y - 1}, {x: c.x + 1, y: c.y}, {x: c.x - 1, y: c.y}, {x: c.x, y: c.y + 1}, {x: c.x, y: c.y - 1}];
}

function numberOfNeighbours(grid: Grid, cell: Cell) {
	let horizontalNeighbours = grid.filter(c => (c.x == cell.x - 1 || c.x == cell.x + 1) && c.y == cell.y)
	let verticalNeighbours = grid.filter(c => (c.y == cell.y - 1 || c.y == cell.y + 1) && c.x == cell.x)
	let topLeftNeighbours = grid.filter(c => c.y == cell.y + 1 && c.x == cell.x - 1)
	let lowerLeftNeighbours = grid.filter(c => c.y == cell.y - 1 && c.x == cell.x - 1)
	let topRightNeighbours = grid.filter(c => c.y == cell.y + 1 && c.x == cell.x + 1)
	let lowerRightNeighbours = grid.filter(c => c.y == cell.y - 1 && c.x == cell.x + 1)
	return horizontalNeighbours.length + verticalNeighbours.length + topLeftNeighbours.length + lowerLeftNeighbours.length + topRightNeighbours.length + lowerRightNeighbours.length;
}