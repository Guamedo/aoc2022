import { getInputOfDay } from "../utils/utils";

const test = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

(async () => {

    const data = await getInputOfDay(5);
    
    // const [stacks, moves] = test.split(/\r?\n\r?\n/);
    const [stacks, moves] = data.split(/\r?\n\r?\n/);
    
    // Parse stacks
    const stacksList = stacks.split(/\r?\n/);
    const stacksDict: any = {};
    for (let i = stacksList.length-2; i >= 0; i--) {
        for (let j = 0; j < (stacksList[i].length+1)/4; j++) {
            const box = stacksList[i][4*j+1];        
            if(box !== ' '){
                if(!stacksDict[j+1]) {
                    stacksDict[j+1] = [box]
                }else{
                    stacksDict[j+1].push(box)
                }
            }
        }
    }
    // console.log(stacksDict);
    
    // Parse moves
    console.log(moves);
    
    const parsedMoves = moves.split(/\r?\n/).filter(m => m).map(m => m.replace('move ', '').split(/ from | to /).map(e => Number(e)));
    
    const stacksDict9001 = JSON.parse(JSON.stringify(stacksDict));
    for (const move of parsedMoves) {
        const [num, from, to] = move;
        
        const out = stacksDict[from].splice(stacksDict[from].length-num, num);
        stacksDict[to].push(...out.reverse());

        const out2 = stacksDict9001[from].splice(stacksDict9001[from].length-num, num);
        stacksDict9001[to].push(...out2);
    }
    
    console.log(Object.values(stacksDict).map((v: any) => v.at(-1)).join(''));
    console.log(Object.values(stacksDict9001).map((v: any) => v.at(-1)).join(''));
})();