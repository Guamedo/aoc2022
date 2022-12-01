const fs = require('fs');
const path = require('path');

const data = fs.readFileSync( path.join(__dirname+'/inputs/d1.in'), 'utf-8')

const elfs: number[] = (data.split('\r\n\r\n').map((e: string) => e.split('\r\n').reduce((acc: number, val: string) => acc+parseInt(val), 0))).sort((a: number, b: number) => b-a);

console.log(elfs.at(0));
console.log((elfs.at(0)||0)+(elfs.at(1)||0)+(elfs.at(2)||0));

