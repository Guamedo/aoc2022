import { getInputOfDay } from '../utils/utils';

const result: any = {'A X': 3+1, 'B Y': 3+2, 'C Z': 3+3, 'A Y': 6+2, 'A Z': 0+3, 'B X': 0+1, 'B Z': 6+3, 'C X': 6+1, 'C Y': 0+2};
const result2: any = {'A X': 0+3, 'B Y': 3+2, 'C Z': 6+1, 'A Y': 3+1, 'A Z': 6+2, 'B X': 0+1, 'B Z': 6+3, 'C X': 0+2, 'C Y': 3+3};

(async() => {
  const data = await getInputOfDay(2);
  
  const strategy: any[] = data.split(/[^A-Z]*\n[^A-Z]*/).map((match: string) => result[match]);
  const strategy2: any[] = data.split(/[^A-Z]*\n[^A-Z]*/).map((match: string) => result2[match]);
  
  console.log(strategy.reduce((acc, val) => acc+val, 0));
  console.log(strategy2.reduce((acc, val) => acc+val, 0));
})();
