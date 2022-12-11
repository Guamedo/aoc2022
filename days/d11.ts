import { getInputOfDay } from "../utils/utils";

interface Monkey {items: number[], operation: string, div: number, trueMonkey: number, falseMonkey: number, inspectedItems: number}
const monkeyParser = (str: string):Monkey => {
  const lines = str.split(/\r?\n/);
  const items = lines[1].replace('Starting items:', '').split(',').map(i => parseInt(i)).filter(i => !isNaN(i));
  const operation = lines[2].substring(lines[2].indexOf('=')+1).trim();
  const div = parseInt(lines[3].substring(lines[3].indexOf('by')+2).trim());
  const trueMonkey = parseInt(lines[4].substring(lines[4].indexOf('monkey')+6).trim());
  const falseMonkey = parseInt(lines[5].substring(lines[5].indexOf('monkey')+6).trim());
  return {items, operation, div, trueMonkey, falseMonkey, inspectedItems: 0}
}

(async () => {
  const data = await getInputOfDay(11);
  const monkeys = data.split(/\r?\n\r?\n/).map(monkeyParser);
  
  for(let i = 0; i < 20; i++){
    for (const monkey of monkeys) {
      while(monkey.items.length){
        const newItem = Math.floor(eval(monkey.operation.replace(/old/g, monkey.items.shift()?.toString()||'0'))/3);
        monkeys[!(newItem%monkey.div)?monkey.trueMonkey:monkey.falseMonkey].items.push(newItem);
        monkey.inspectedItems++;
      }
    }
  }
  console.log(monkeys.map(m => m.inspectedItems).sort((a,b) => b-a).splice(0,2).reduce((acc,val) => acc*val,1));

  const monkeys2 = data.split(/\r?\n\r?\n/).map(monkeyParser);
  const modulo = monkeys.reduce((acc,val) => acc*val.div,1);

  for(let i = 0; i < 10_000; i++){
    for (const monkey of monkeys2) {
      while(monkey.items.length){
        let newItem = eval(monkey.operation.replace(/old/g, monkey.items.shift()?.toString()||'0'))%modulo;
        monkeys2[!(newItem%monkey.div)?monkey.trueMonkey:monkey.falseMonkey].items.push(newItem);
        monkey.inspectedItems++;
      }
    }
  }
  console.log(monkeys2.map(m => m.inspectedItems).sort((a,b) => b-a).splice(0,2).reduce((acc,val) => acc*val,1));
})();