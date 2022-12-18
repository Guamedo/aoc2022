import { getInputOfDay, Vec3 } from "../utils/utils";

(async() => {
  let maxX = 0;
  let maxY = 0;
  let maxZ = 0;

  const data = await getInputOfDay(18);
  let cubes: Vec3[] = data.split(/\r?\n/)
  .map((cubePos: string): Vec3 => {
    const cubePosList = cubePos.split(',');
    const cubePosVec = {x: parseInt(cubePosList[0])+1, y: parseInt(cubePosList[1])+1, z: parseInt(cubePosList[2])+1};

    maxX = Math.max(maxX, cubePosVec.x);
    maxY = Math.max(maxY, cubePosVec.y);
    maxZ = Math.max(maxZ, cubePosVec.z);

    return cubePosVec;
  });

  const grid = new Array(maxX+2).fill(0).map(_=>new Array(maxY+2).fill(0).map(_=>new Array(maxZ+2).fill(0)))
  for(const cube of cubes) grid[cube.x][cube.y][cube.z] = 1;

  function isOutside(startPoint: Vec3){
    const openSet = [startPoint];
    let end = false;

    const gridCopy = JSON.parse(JSON.stringify(grid));
    while(openSet.length && !end){
      const cube = openSet.shift() as Vec3;
      if(cube.x === 1 || cube.y === 1 || cube.z === 1 || cube.x === grid.length-2 || cube.y === grid[0].length-2 || cube.z === grid[0][0].length-2) {
        end = true;
      }else{
        gridCopy[cube.x][cube.y][cube.z] = 1;
        const testPos = [
          {x: cube.x+1, y: cube.y, z: cube.z}, {x: cube.x-1, y: cube.y, z: cube.z}, 
          {x: cube.x, y: cube.y+1, z: cube.z}, {x: cube.x, y: cube.y-1, z: cube.z}, 
          {x: cube.x, y: cube.y, z: cube.z+1}, {x: cube.x, y: cube.y, z: cube.z-1}
        ].filter(pos => gridCopy[pos.x] && gridCopy[pos.x][pos.y] && gridCopy[pos.x][pos.y][pos.z] === 0);

        for(const newPos of testPos){
          if(!openSet.find(pos => pos.x===newPos.x && pos.y === newPos.y && pos.z === newPos.z)){
            openSet.push(newPos);
          }
        }
      }
    }
    return end;
  }

  let sum1 = 0, sum2 = 0;
  for(const cube of cubes){
    const testPos = [
      {x: cube.x+1, y: cube.y, z: cube.z}, {x: cube.x-1, y: cube.y, z: cube.z}, 
      {x: cube.x, y: cube.y+1, z: cube.z}, {x: cube.x, y: cube.y-1, z: cube.z}, 
      {x: cube.x, y: cube.y, z: cube.z+1}, {x: cube.x, y: cube.y, z: cube.z-1} 
    ];

    for(let pos of testPos){
      if(grid[pos.x][pos.y][pos.z] === 0) sum1++;
      if(grid[pos.x][pos.y][pos.z] === 0 && isOutside({x: pos.x, y: pos.y, z: pos.z})) sum2++;
    }    
  }
  console.log(sum1);
  console.log(sum2);
})();