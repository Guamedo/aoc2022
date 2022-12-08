import { getInputOfDay } from '../utils/utils';

(async() => {
  const data = await getInputOfDay(4);
  const sections: string[] = data.split(/\r*\n/);
  
  let sum = 0;
  for (const section of sections) {
    const [p1, p2] = section.split(',');
    const [p1Min, p1Max] = p1.split('-').map(p => parseInt(p));
    const [p2Min, p2Max] = p2.split('-').map(p => parseInt(p));
    if((p1Min >= p2Min && p1Max <= p2Max) || (p2Min >= p1Min && p2Max <= p1Max)) sum++;
  }
  console.log(sum);
  
  let sum2 = 0;
  for (const section of sections) {
    const [p1, p2] = section.split(',');
    const [p1Min, p1Max] = p1.split('-').map(p => parseInt(p));
    const [p2Min, p2Max] = p2.split('-').map(p => parseInt(p));
    if((p1Min >= p2Min && p1Min <= p2Max) || (p1Max >= p2Min && p1Max <= p2Max) || (p2Min >= p1Min && p2Min <= p1Max) || (p2Max >= p1Min && p2Max <= p1Max)) sum2++;
  }
  console.log(sum2);
})();
