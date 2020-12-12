class ConwaysGameOfLife {
  constructor() {
    this.liveCells = {}
    this.addCell(this.liveCells, new Cell(2,1))
    this.addCell(this.liveCells, new Cell(2,2))
    this.addCell(this.liveCells, new Cell(3,1))
    this.addCell(this.liveCells, new Cell(3,2))
    this.addCell(this.liveCells, new Cell(4,1))
    this.addCell(this.liveCells, new Cell(4,2))
  }

  next() {
    this.liveCells = this.getNextState();
  }

  addCell(lst, cell) {
    lst[cell.toKey()] = cell;
  }

  isAlive(cell) {
    return this.liveCells.hasOwnProperty(cell.toKey());
  }

  getNextState() {
    const cellsToConsider = {};
    const nextLiveCells = {};

    for (const cellKey in this.liveCells) {
      const cell = this.liveCells[cellKey];
      const neighborsLst = this.getNeighbors(cell);
      this.addCell(cellsToConsider, cell);
      for (const neighbor of neighborsLst) {
        this.addCell(cellsToConsider, neighbor);
      }
    }

    for (const cellKey in cellsToConsider) {
      const cell = cellsToConsider[cellKey]
      const what = this.willBeAlive(cell);
      if (what) {
        this.addCell(nextLiveCells, cell);
      }
    }
    return nextLiveCells;
  }

  willBeAlive(cell) {
    const liveCount = this.getLiveCount(cell)
    const forLiving = this.isAlive(cell) && liveCount > 1 && liveCount < 4;
    const forDead = !this.isAlive(cell) && liveCount === 3;
    return forLiving || forDead;
  }

  getNeighbors(cell) {
    const x = cell.x
    const y = cell.y
    return [
      new Cell(x - 1, y + 1),
      new Cell(x, y + 1),
      new Cell(x + 1, y + 1),
      new Cell(x - 1, y),
      new Cell(x + 1, y),
      new Cell(x - 1, y - 1),
      new Cell(x, y - 1),
      new Cell(x + 1, y - 1),
      ]
  }

  getLiveCount(cell) {
    const neighbors = this.getNeighbors(cell);
    var liveCount = 0;
    for (const neigbor of neighbors) {
      if (this.isAlive(neigbor)) {
        liveCount++;
      }
    }
    return liveCount;
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toKey() {
    return `x${this.x},y${this.y}`;
  }
}

function main() {
  const game = new ConwaysGameOfLife();
  console.log(game);
  game.next();
  console.log(game);
  /*
  step 0: 'x2,y1','x2,y2','x3,y1','x3,y2','x4,y1','x4,y2'
   3[_,_,_,_,_,_,_]
   2[_,_,x,x,x,_,_]
   1[_,_,x,x,x,_,_]
   0[_,_,_,_,_,_,_]
     0,1,2,3,4,5,6
  step 1: 'x2,y1','x2,y2','x3,y0','x3,y3','x4,y1','x4,y2'
   3[_,_,_,x,_,_,_]
   2[_,_,x,_,x,_,_]
   1[_,_,x,_,x,_,_]
   0[_,_,_,x,_,_,_]
     0,1,2,3,4,5,6
   */
}

main();