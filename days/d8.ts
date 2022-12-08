import { getInputOfDay } from "../utils/utils";

function isVisible(row: number, col: number, greed: string[]): boolean{
  const treeHeight = greed[row][col];

  // Top visible
  let visibleTop = true;
  for(let i = row-1; i >= 0 && visibleTop; i--){
    if(greed[i][col] >= treeHeight) visibleTop = false;
  }
  if(visibleTop) return true;

  // Top bottom
  let visibleBottom = true;
  for(let i = row+1; i < greed.length && visibleBottom; i++){
    if(greed[i][col] >= treeHeight) visibleBottom = false;
  }
  if(visibleBottom) return true;

  // Left visible
  let visibleLeft = true;
  for(let i = col-1; i >= 0 && visibleLeft; i--){
    if(greed[row][i] >= treeHeight) visibleLeft = false;
  }
  if(visibleLeft) return true;

  // Right bottom
  let visibleRight = true;
  for(let i = col+1; i < greed[0].length && visibleRight; i++){
    if(greed[row][i] >= treeHeight) visibleRight = false;
  }
  if(visibleRight) return true;

  return false;
}

function visibleTreeSum(row: number, col: number, greed: string[]): number{
  const treeHeight = greed[row][col];

  let [sumTop, sumBottom, sumLeft, sumRight] = [0, 0, 0, 0];

  // Top visible
  let end = false;
  for(let i = row-1; i >= 0 && !end; i--){
    sumTop++;
    if(greed[i][col] >= treeHeight){
      end = true;
    }
  }

  // Bottom visible
  end = false;
  for(let i = row+1; i < greed.length && !end; i++){
    sumBottom++;
    if(greed[i][col] >= treeHeight){
      end = true;
    }
  }

  // Left visible
  end = false;
  for(let i = col-1; i >= 0 && !end; i--){
    sumLeft++;
    if(greed[row][i] >= treeHeight){
      end = true;
    }
  }

  // Right visible
  end = false;
  for(let i = col+1; i < greed[0].length && !end; i++){
    sumRight++;
    if(greed[row][i] >= treeHeight){
      end = true;
    }
  }

  return sumTop*sumBottom*sumLeft*sumRight;
}


(async () => {
  const data = await getInputOfDay(8);
  const greed: string[] = data.split(/\r?\n/);
  
  let sum = greed.length*2+greed[0].length*2-4;
  for (let row = 1; row < greed.length-1; row++) {
    for (let col = 1; col < greed[row].length-1; col++) {
      if(isVisible(row, col, greed)) sum++;
    }
  }
  console.log(sum);

  let maxTreeScore = 0;
  for (let row = 0; row < greed.length; row++) {
    for (let col = 0; col < greed[row].length; col++) {
      const score = visibleTreeSum(row, col, greed);
      maxTreeScore = Math.max(maxTreeScore, score);
    }
  }
  console.log(maxTreeScore);  

})();


