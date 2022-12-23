import { getInputOfDay } from "../utils/utils";

function parseInput(monkeyStr: string){
  const nameIndex = monkeyStr.indexOf(':');
  const name = monkeyStr.substring(0, nameIndex);

  const job = monkeyStr.substring(nameIndex+2);
  if(isNaN(parseInt(job))){
    const jobOperation = job.split(' ');
    return [name, {val: jobOperation, isNumber: false}]
  }else{
    const jobNum = parseInt(job);
    return [name, {val: jobNum, isNumber: true}]
  }
}

(async () => {
  const data = await getInputOfDay(21);
  const monkeys = Object.fromEntries(data.split(/\r?\n/).map(parseInput));

  function getMonkeyValue(monkey: string): string{
    if(monkeys[monkey].isNumber){
      return monkeys[monkey].val.toString();
    }else{
      const job: [string, string, string] = monkeys[monkey].val as [string, string, string];

      const val0 = getMonkeyValue(job[0])
      const val2 = getMonkeyValue(job[2])
      
      if(!val0.includes('x') && !val2.includes('x')){
        return (eval(`(${val0})${job[1]}(${val2})`)).toString();
      }else{
        return `(${val0})${job[1]}(${val2})`;
      }
    }
  }
  console.log(getMonkeyValue('root'));

  monkeys['humn'].val = 'x';
  const rootMonkeyVal = monkeys['root'].val;

  // Use sympy solve to get te value of x for [getMonkeyValue(rootMonkeyVal[0]) - getMonkeyValue(rootMonkeyVal[2]) = 0] equation
  console.log(getMonkeyValue(rootMonkeyVal[0]));
  console.log(getMonkeyValue(rootMonkeyVal[2]));
})();