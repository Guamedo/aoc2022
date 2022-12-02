import fs from 'fs';
import path from 'path';

const data = fs.readFileSync( path.join(__dirname+'/inputs/d1.in'), 'utf-8')
const elfs: number[] = (data.split('\r\n\r\n').map((e: string) => e.split('\r\n').reduce((acc: number, val: string) => acc+parseInt(val), 0))).sort((a: number, b: number) => b-a);

console.log(elfs[0]);
console.log(elfs[0]+elfs[1]+elfs[2]);

