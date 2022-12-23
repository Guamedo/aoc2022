import FS from 'fs';
import PATH from 'path';
import { deepCopy, getInputOfDay, negativeMod, Vec } from '../utils/utils';

function processPath(path: string){
  const letterPos = path.matchAll(/(L|R)/g);

  const pathProcessed = []
  const letterPosArray = Array.from(letterPos);

  pathProcessed.push(parseInt(path));
  for (let i = 0; i < letterPosArray.length; i++) {
    const pos = letterPosArray[i];
    pathProcessed.push(pos[0]);
    pathProcessed.push(parseInt(path.substring((pos.index||0)+1)));
    
  }
  return pathProcessed;
}

(async () => {
  const test = FS.readFileSync(PATH.join(__dirname, '../inputs/input22_test.txt'), 'utf8');

  const data = await getInputOfDay(22);
  const mapAndPath = data.split(/\r?\n\r?\n/);

  const map = mapAndPath[0];
  const mapGrid: string[][] = map.split(/\r?\n/).map(x => x.split(''));
  const mapGridCopy: string[][] = deepCopy(mapGrid);

  const path = mapAndPath[1];
  const pathArray = processPath(path);
  
  const position: Vec = {x: mapGrid[0].findIndex(x => x === '.'), y: 0};
  
  // 0: Right, 1: Up, 2: Left, 3: Down
  let facingDirection: number = 0;
  const facingMove = [
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
    {x: 0, y: -1}
  ];

  function firstRowWithPath(y: number): number{
    for (let x = 0; x < mapGrid[y].length; x++) {
      if(mapGrid[y] && mapGrid[y][x] && mapGrid[y][x] !== ' ') return x;
    }
    return mapGrid[y].length-1;
  }
  function lastRowWithPath(y: number): number{
    let index: number = 0;
    for (let x = 0; x < mapGrid[y].length; x++) {
      if(mapGrid[y] && mapGrid[y][x] && mapGrid[y][x] !== ' ') index = x;
    }
    return index;
  }
  function firstColWithPath(x: number): number{
    for (let y = 0; y < mapGrid.length; y++) { 
      if(mapGrid[y] && mapGrid[y][x] && mapGrid[y][x] !== ' ') return y;
    }
    return mapGrid[0][x].length-1;
  }
  function lastColWithPath(x: number): number{
    let index = 0;
    for (let y = 0; y < mapGrid.length; y++) {
      if(mapGrid[y] && mapGrid[y][x] && mapGrid[y][x] !== ' ') index = y;
    }
    return index;
  }

  for(const step of pathArray){
    if(step === 'R'){
      facingDirection = negativeMod(facingDirection+1, 4);
    }else if(step === 'L'){
      facingDirection = negativeMod(facingDirection-1, 4);
    }else{
      let end = false;
      for (let i = 0; i < step && !end; i++) {
        mapGridCopy[position.y][position.x] = ['>', 'v', '<', '^'][facingDirection];
        const newPosition = {x: position.x+facingMove[facingDirection].x, y: position.y+facingMove[facingDirection].y};
        const cell = mapGrid[newPosition.y]?(mapGrid[newPosition.y][newPosition.x]):undefined;
        if(cell === '.'){
          position.x = newPosition.x;
          position.y = newPosition.y;
        }else if(cell === '#'){
          end = true;
        }else if(cell === ' ' || cell === undefined){
          switch(facingDirection){
            case 0: // Right
              newPosition.x = firstRowWithPath(position.y);
              break;
            case 1: // Down
              newPosition.y = firstColWithPath(position.x);
              break;
            case 2: // Left
              newPosition.x = lastRowWithPath(position.y);
              break;
            case 3: // Up
              newPosition.y = lastColWithPath(position.x);
              break;
          }
          if(mapGrid[newPosition.y][newPosition.x] === '.'){            
            position.x = newPosition.x;
            position.y = newPosition.y;
          }else{
            end = true;
          }
        }
      }
    }
  }
  // console.log(mapGridCopy.map(x => x.join('')).join('\n'));
  
  console.log((position.y+1)*1000+(position.x+1)*4+facingDirection);
})();