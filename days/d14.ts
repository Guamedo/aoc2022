import { getInputOfDay, Vec } from "../utils/utils";

(async () => {
  const data = await getInputOfDay(14);

  let minX = 500, maxX = 500, minY = 0, maxY = 0;
  const rocks: Vec[][] = data.split(/\r?\n/).map(path => path.split(' -> ').map(posStr => {
    const pos = posStr.split(',');
    const posVec: Vec = {x: parseInt(pos[0]), y: parseInt(pos[1])};
    minX = Math.min(minX, posVec.x);
    maxX = Math.max(maxX, posVec.x);
    minY = Math.min(minY, posVec.y);
    maxY = Math.max(maxY, posVec.y);
    return posVec;
  }));

  minX = 500-(maxY-minY+1)-1;
  maxX = 500+(maxY-minY+1)+1;
  const grid = new Array(maxY-minY+1).fill(null).map(_ => new Array(maxX-minX+1).fill(null).map(_ => '.'));
  
  const grid2 = new Array(maxY-minY+2).fill(null).map(_ => new Array(maxX-minX+1).fill(null).map(_ => '.'));
  grid2.push(new Array(maxX-minX+1).fill(null).map(_ => '#'))
  
  // Draw spawn point
  const spawnPointNormalized: Vec = {x: 500-minX, y: 0-minY}
  grid[spawnPointNormalized.y][spawnPointNormalized.x] = '+';
  grid2[spawnPointNormalized.y][spawnPointNormalized.x] = '+';

  // Draw rocks
  for(const rock of rocks){
    let startPoint = rock[0];
    for (let i = 1; i < rock.length; i++) {
      const endPoint = rock[i];
      if(startPoint.x === endPoint.x){ // Move in Y
        for (let y = Math.min(startPoint.y, endPoint.y); y <= Math.max(startPoint.y, endPoint.y); y++) {
          grid[y-minY][startPoint.x-minX] = '#';
          grid2[y-minY][startPoint.x-minX] = '#';
        }
      }else if(startPoint.y === endPoint.y){ // Move in X
        for (let x = Math.min(startPoint.x, endPoint.x); x <= Math.max(startPoint.x, endPoint.x); x++) {
          grid[startPoint.y-minY][x-minX] = '#';
          grid2[startPoint.y-minY][x-minX] = '#';
        }
      }
      startPoint = endPoint;
    }
  }

  let end = false;
  let sandCount = 0;
  while(!end){
    const newSandPosition = {x: spawnPointNormalized.x, y: spawnPointNormalized.y};
    let sandEnd = false;
    while(!sandEnd){
      if(grid[newSandPosition.y+1] !== undefined){
        if(grid[newSandPosition.y+1][newSandPosition.x] === '.'){
          newSandPosition.y++;
        }else{
          if(grid[newSandPosition.y+1][newSandPosition.x-1] === '.'){
            newSandPosition.y++;
            newSandPosition.x--;
          }else if(grid[newSandPosition.y+1][newSandPosition.x+1] === '.'){
            newSandPosition.y++;
            newSandPosition.x++;
          }else{
            grid[newSandPosition.y][newSandPosition.x] = 'o'; 
            sandCount++;
            sandEnd = true;
          }
        }
      }else{
        sandEnd = true;
        end = true;
      }
    }
  }
  // console.log(grid.map(x => x.join('')).join('\n')+'\n');
  console.log(sandCount);

  end = false;
  sandCount = 0;
  while(!end){
    const newSandPosition = {x: spawnPointNormalized.x, y: spawnPointNormalized.y};
    let sandEnd = false;
    while(!sandEnd){
      if(grid2[newSandPosition.y+1][newSandPosition.x] === '.'){
        newSandPosition.y++;
      }else{
        if(grid2[newSandPosition.y+1][newSandPosition.x-1] === '.'){
          newSandPosition.y++;
          newSandPosition.x--;
        }else if(grid2[newSandPosition.y+1][newSandPosition.x+1] === '.'){
          newSandPosition.y++;
          newSandPosition.x++;
        }else{
          grid2[newSandPosition.y][newSandPosition.x] = 'o'; 
          sandCount++;
          sandEnd = true;
        }
      }
      if(newSandPosition.x === spawnPointNormalized.x && newSandPosition.y === spawnPointNormalized.y){
        sandEnd = true;
        end = true;
      }
    }
  }
  // console.log(grid2.map(x => x.join('')).join('\n')+'\n');
  console.log(sandCount);
})();