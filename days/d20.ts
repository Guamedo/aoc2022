import { getInputOfDay } from "../utils/utils";

(async () => {
  const data = await getInputOfDay(20);
  
  const file = data.split(/\r?\n/).map(x => {return {num: parseInt(x)}});
  const fileCopy: any[] = [...file];

  for (const num of file) {
    const desp = num.num;
    const numIndex = fileCopy.findIndex(x => x === num)
    const moveNumber = fileCopy.splice(numIndex, 1)[0];
    let newIndex = (numIndex+desp)%(file.length-1);;
    fileCopy.splice(newIndex, 0, moveNumber);
  }

  let zeroIndex = fileCopy.findIndex(x => x.num === 0);
  let n1000 = fileCopy[(zeroIndex+1000)%fileCopy.length].num;
  let n2000 = fileCopy[(zeroIndex+2000)%fileCopy.length].num;
  let n3000 = fileCopy[(zeroIndex+3000)%fileCopy.length].num;

  console.log(n1000+n2000+n3000);

  const file2 = data.split(/\r?\n/).map(x => {return {num: parseInt(x)*811589153}});
  const fileCopy2: any[] = [...file2];

  for (let i = 0; i < 10; i++) {
    for (const num of file2) {
      const desp = num.num;
      const numIndex = fileCopy2.findIndex(x => x === num)
      const moveNumber = fileCopy2.splice(numIndex, 1)[0];
      let newIndex = (numIndex+desp)%(file2.length-1);;
      fileCopy2.splice(newIndex, 0, moveNumber);
    }
  }

  zeroIndex = fileCopy2.findIndex(x => x.num === 0);
  n1000 = fileCopy2[(zeroIndex+1000)%fileCopy2.length].num;
  n2000 = fileCopy2[(zeroIndex+2000)%fileCopy2.length].num;
  n3000 = fileCopy2[(zeroIndex+3000)%fileCopy2.length].num;
  
  console.log(n1000+n2000+n3000);
})();