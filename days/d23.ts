import { euclideanDist, getInputOfDay, Vec } from "../utils/utils";

const test = 
`....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;

interface Elf {position: Vec, nextPosition: Vec}

(async () => {
  const elves: Elf[] = [];
  const data = await getInputOfDay(23);
  for (let y = 0; y < data.split(/\r?\n/).length; y++) {
    const element = data.split(/\r?\n/)[y];
    for(let x = 0; x < element.length; x++){
      if(element[x] === '#'){
        elves.push({position: {x: x, y: y}, nextPosition: {x: x, y: y}});
      }
    }
  }

  const testDirection: any = {
    'N': ['N', 'NW', 'NE'],
    'S': ['S', 'SW', 'SE'],
    'E': ['E', 'NE', 'SE'],
    'W': ['W', 'NW', 'SW']
  }
  const moveDirection: any = {
    'N': {x: 0, y: -1},
    'S': {x: 0, y: 1},
    'E': {x: 1, y: 0},
    'W': {x: -1, y: 0}
  }
  const moveOrder = ['N', 'S', 'W', 'E'];

  let movedElf = true;
  let round = 0;
  // for (let i = 0; i < 10; i++) {
  while(movedElf){
    // Calculate Next position
    for (let j = 0; j < elves.length; j++) {
      const elf1 = elves[j];
      const nextElves: any = {'N': false, 'S': false, 'E': false, 'W': false, 'NW': false, 'SW': false, 'NE': false, 'SE': false};
      for (let k = 0; k < elves.length; k++) {
        if(j !== k){
          const elf2 = elves[k];
          if(elf1.position.x === elf2.position.x && elf1.position.y-1 === elf2.position.y) nextElves['N'] = true;
          if(elf1.position.x === elf2.position.x && elf1.position.y+1 === elf2.position.y) nextElves['S'] = true;
          if(elf1.position.x+1 === elf2.position.x && elf1.position.y === elf2.position.y) nextElves['E'] = true;
          if(elf1.position.x-1 === elf2.position.x && elf1.position.y === elf2.position.y) nextElves['W'] = true;
          if(elf1.position.x-1 === elf2.position.x && elf1.position.y-1 === elf2.position.y) nextElves['NW'] = true;
          if(elf1.position.x+1 === elf2.position.x && elf1.position.y-1 === elf2.position.y) nextElves['NE'] = true;
          if(elf1.position.x-1 === elf2.position.x && elf1.position.y+1 === elf2.position.y) nextElves['SW'] = true;
          if(elf1.position.x+1 === elf2.position.x && elf1.position.y+1 === elf2.position.y) nextElves['SE'] = true;
        }
      }
      if(Object.values(nextElves).some(x => x === true)){
        let moved = false;
        for (let k = 0; k < moveOrder.length && !moved; k++) {
          const moveTo = moveOrder[k];
          if(testDirection[moveTo].every((x: any) => nextElves[x] === false)){
            elf1.nextPosition.x = elf1.position.x + moveDirection[moveTo].x;
            elf1.nextPosition.y = elf1.position.y + moveDirection[moveTo].y;
            moved = true;
          }
        }
        if(!moved){
          elf1.nextPosition.x = elf1.position.x;
          elf1.nextPosition.y = elf1.position.y;
        }
      }else{
        elf1.nextPosition.x = elf1.position.x;
        elf1.nextPosition.y = elf1.position.y;
      }
    }
    const dir: string = moveOrder.shift() as string;
    moveOrder.push(dir);

    movedElf = false;
    for (let j = 0; j < elves.length; j++) {
      const elf1 = elves[j];
      let canMove = true;
      for (let k = 0; k < elves.length; k++) {
        if(j !== k){
          const elf2 = elves[k];
          if(elf1.nextPosition.x === elf2.nextPosition.x && elf1.nextPosition.y === elf2.nextPosition.y) canMove = false;
        }
      }
      if(canMove){
        if(elf1.position.x !== elf1.nextPosition.x || elf1.position.y !== elf1.nextPosition.y){   
          movedElf = true;
        }
        elf1.position.x = elf1.nextPosition.x;
        elf1.position.y = elf1.nextPosition.y;
      }
    }
    round++;
    if(round === 10){
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (const elf of elves) {
        if(elf.position.x < minX) minX = elf.position.x;
        if(elf.position.x > maxX) maxX = elf.position.x;
        if(elf.position.y < minY) minY = elf.position.y;
        if(elf.position.y > maxY) maxY = elf.position.y;
      }
      console.log((maxX-minX+1)*(maxY-minY+1)-elves.length);
    }
  }
  console.log(round);
  

  // let minX = Infinity;
  // let maxX = -Infinity;
  // let minY = Infinity;
  // let maxY = -Infinity;
  // for (const elf of elves) {
  //   if(elf.position.x < minX) minX = elf.position.x;
  //   if(elf.position.x > maxX) maxX = elf.position.x;
  //   if(elf.position.y < minY) minY = elf.position.y;
  //   if(elf.position.y > maxY) maxY = elf.position.y;
  // }

  
  
})();