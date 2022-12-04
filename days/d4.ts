const test: string = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

import fs from 'fs';
import path from 'path';

const data = fs.readFileSync(path.join(__dirname, 'inputs/d4.in'), 'utf-8');

// const sections: string[] = test.split(/\r*\n/);
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