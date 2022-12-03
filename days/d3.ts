import fs from 'fs';
import path from 'path';

const data = fs.readFileSync(path.join(__dirname, 'inputs/d3.in'), 'utf-8');

const contents = data.split(/\r*\n/).map(c => {
  const length = c.length;
  const c1 = c.substring(0, length/2);
  const c2 = c.substring(length/2);
  let char: any = null;
  for (const c of c1) {
    if(c2.includes(c)) char = c.match(/[a-z]/)?(c.charCodeAt(0)-97+1):c.charCodeAt(0)-65+27;
  }
  return char;
});
console.log(contents.reduce((acc, val) => acc+val, 0));

const groups = data.split(/\r*\n/);
let sum = 0;
for (let i = 0; i < groups.length; i+=3) {
  const l1 = groups[i];
  const l2 = groups[i+1];
  const l3 = groups[i+2];
  
  let char: any = null;
  for (const c of l1) {
    if(l2.includes(c) && l3.includes(c)) char = c.match(/[a-z]/)?(c.charCodeAt(0)-97+1):c.charCodeAt(0)-65+27;
  }
  sum += char;
}
console.log(sum);