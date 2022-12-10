import { getInputOfDay } from "../utils/utils";

interface Instruction {instruction: string, value?: number}
const cycles: number[] = [20, 60, 100, 140, 180, 220];

(async () => {
  const data = await getInputOfDay(10);
  const program: Instruction[] = data.split(/\r?\n/).map((p): Instruction => {const [i, v] = p.split(' '); return {instruction: i, ...(v?{value: parseInt(v)}:{})}});

  let x = 1, cycle = 1, checkCycleIndex = 0, sum = 0;
  for (const instruction of program) {
    cycle += (instruction.instruction === 'noop')?1:2;
    if(cycle>cycles[checkCycleIndex]) sum += x*cycles[checkCycleIndex++];
    x += (instruction.instruction === 'noop')?0:(instruction.value||0);
  }
  console.log(sum);

  x = 1; 
  cycle = 1;

  let endProgram = false;
  let readInstructionCounter = 0;
  let instructionIndex = 0;
  let lastInstruction: Instruction = (null as any);

  const image = new Array(6).fill(null).map(_ => ' '.repeat(40).split(''));

  while(!endProgram){
    if(readInstructionCounter <= 0){
      if(lastInstruction) x += (lastInstruction.instruction === 'noop')?0:(lastInstruction.value||0);
      lastInstruction = program[instructionIndex++];
      readInstructionCounter = (lastInstruction.instruction === 'noop')?1:2;
      endProgram = instructionIndex >= program.length;
    }
    
    const [row, col] = [Math.floor((cycle-1)/40), (cycle-1)%40];
    if(col >= x-1 && col <= x+1) image[row][(cycle-1)%40] = '#';
    cycle++;
    readInstructionCounter--;
  }
  console.log(image.map(i => i.join('')).join('\n'));
})();