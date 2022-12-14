import { getInputOfDay } from "../utils/utils";

interface Cell {value: any, energy: number};
interface Vec {x: number, y: number};

let minEnergy: number = Infinity;
let grid: Cell[][];

function bfs(openSet: Vec[]){
  while(openSet.length){
    const cellPosition = openSet.shift() as Vec;
    const actualCell = grid[cellPosition.y][cellPosition.x];

    if(actualCell.value === 'S') minEnergy = Math.min(minEnergy, actualCell.energy);
    
    let newPositions: Vec[] = [
      {x: cellPosition.x, y: cellPosition.y-1}, {x: cellPosition.x, y: cellPosition.y+1}, 
      {x: cellPosition.x-1, y: cellPosition.y}, {x: cellPosition.x+1, y: cellPosition.y}]
    .filter((pos: Vec) => {
      const newCell = grid[pos.y]?grid[pos.y][pos.x]:null;
      return newCell && newCell.energy > actualCell.energy+1 &&
        ((actualCell.value==='E' && ('z'.charCodeAt(0)-96-1) <= newCell.value) ||
          (newCell.value==='S' && (actualCell.value-1) <= ('a'.charCodeAt(0)-96)) ||
          actualCell.value-1 <= newCell.value);
    });

    newPositions.forEach((pos: Vec) => {
      grid[pos.y][pos.x].energy = Math.min(grid[pos.y][pos.x].energy, actualCell.energy+1);
    });

    for(const newPos of newPositions){
      if(!openSet.find(pos => pos.x===newPos.x && pos.y === newPos.y)){
        openSet.push(newPos);
      }
    }
  }
}

(async() => {
  let startPosition: Vec =  {x: 0, y: 0};
  const data = await getInputOfDay(12);
  grid = data.split(/\r?\n/)
    .map((row, i) => row.split('')
    .map((col, j) => {
      if(col === 'E') startPosition = {x: j, y: i};
      return {value: (col!=='S'&&col!=='E')?(col.charCodeAt(0)-96):col, energy: Infinity}
    }));
  grid[startPosition.y][startPosition.x].energy = 0;
  bfs([startPosition]);
  console.log(minEnergy);
  console.log(grid.flatMap(c => c).filter(c => c.value === 1).sort((a, b) => a.energy-b.energy)[0].energy);
})();
