import { getInputOfDay, Vec } from "../utils/utils";

(async () => {

  const test = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;

  const data = await getInputOfDay(17);
  const jetPattern = test;
  console.log(jetPattern.length);
  
  
  const grid = new Array(2022*4).fill(0).map(_ => new Array(7).fill('.'));

  const rocks = [
    [['@','@','@','@']],

    [['.','@','.'], 
     ['@','@','@'], 
     ['.','@','.']],

    [['.','.','@'], 
     ['.','.','@'], 
     ['@','@','@']],

    [['@'], 
     ['@'], 
     ['@'], 
     ['@']],

    [['@','@'], 
     ['@','@']]
  ];
  
  let maxHeight: number = 0;
  let rockIndex: number = 0;
  let jetIndex: number = 0;
  
  for(let i = 0; i < 2022; i++){
    const pos: Vec = {x: 2, y: maxHeight+3};
    const rock = rocks[rockIndex];

    let end = false;
    while(!end){
      // Mode side
      const c = jetPattern.charAt(jetIndex);
      jetIndex = (jetIndex+1)%jetPattern.length;

      const newPosX = pos.x+((c==='>')?1:-1);
      if(newPosX >= 0 && newPosX+rock[0].length <= 7){        
        let move = true;
        for (let y = 0; y < rock.length && move; y++) {
          for (let x = 0; x < rock[y].length && move; x++) {
            if((grid[pos.y+(rock.length-y-1)][newPosX+x] === '#' && rock[y][x] === '@')){
              move = false;
            }
          }
        }
        if(move) pos.x = newPosX;
      }

      // Move down
      const newPosY = pos.y-1;
      if(newPosY >= 0){
        let move = true;
        for (let y = 0; y < rock.length && move; y++) {
          for (let x = 0; x < rock[y].length && move; x++) {
            if((grid[newPosY+(rock.length-y-1)][pos.x+x] === '#' && rock[y][x] === '@')){
              move = false;
            }
          }
        }
        if(move) {
          pos.y = newPosY;
        }else{
          end = true;
          if((pos.y+rock.length) > maxHeight){
            maxHeight = pos.y+rock.length;
          }
        }
      }else{
        end = true;
        if((pos.y+rock.length) > maxHeight){
          maxHeight = pos.y+rock.length;
        }
      }
    }

    for (let y = 0; y < rock.length; y++) {
      for (let x = 0; x < rock[y].length; x++) {
        if(rock[y][x] === '@') grid[pos.y+(rock.length-y-1)][pos.x+x] = '#';
      }
    }
    rockIndex = (rockIndex+1)%rocks.length;
  }

  console.log(maxHeight);
  
})();