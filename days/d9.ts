import { getInputOfDay } from "../utils/utils";

interface Move {dir: string, steps: number};
interface Vec {x: number, y: number};

const directionToVec: {[key: string]: Vec} = {'U': {x: 0, y: 1}, 'D': {x: 0, y: -1}, 'L': {x: -1, y: 0}, 'R': {x: 1, y: 0}};

const distVecToVec = (v1: Vec, v2: Vec): number => Math.sqrt((v2.x-v1.x)**2+(v2.y-v1.y)**2);
const manhattanClampDistVecToVec = (v1: Vec, v2: Vec): Vec => { return {x: Math.min(Math.max(v2.x-v1.x, -1), 1), y: Math.min(Math.max(v2.y-v1.y, -1), 1)}};

(async () =>{
  const data = await getInputOfDay(9);
  const motions: Move[] = data.split(/\r?\n/).map((m): Move => { const [d, n] = m.split(' '); return {dir: d, steps: parseInt(n)}});

  const headPos: Vec = {x: 0, y: 0};
  const headPosP: Vec = {x: 0, y: 0};
  const tailPos: Vec = {x: 0, y: 0};
  const tailPositions: any = {'0,0': true};

  for (const move of motions) {
    const directionVec = directionToVec[move.dir];
    for (let i = 0; i < move.steps; i++) {
      headPosP.x = headPos.x;
      headPosP.y = headPos.y;
      headPos.x += directionVec.x;
      headPos.y += directionVec.y;
      const distHeadToTail = distVecToVec(headPos, tailPos);
      if(distHeadToTail >= 2){
        const mDistHeadToTail = manhattanClampDistVecToVec(tailPos, headPos);
        tailPos.x += mDistHeadToTail.x;
        tailPos.y += mDistHeadToTail.y;
        tailPositions[`${tailPos.x},${tailPos.y}`] = true;
      }
    }
  }
  console.log(Object.keys(tailPositions).length);

  const rope: {val: Vec, prev: Vec}[] = new Array(10).fill(0).map(_ => { return {val: {x: 0, y: 0}, prev: {x: 0, y: 0}} });
  const ropeLastKnotPositions: any = {'0,0': true};

  for (const move of motions) {
    const directionVec = directionToVec[move.dir];
    for (let i = 0; i < move.steps; i++) {
      rope[0].prev.x = rope[0].val.x;
      rope[0].prev.y = rope[0].val.y;
      rope[0].val.x += directionVec.x;
      rope[0].val.y += directionVec.y;
      for (let j = 1; j < rope.length; j++) {
        const knot = rope[j];
        const distKnotToPrev = distVecToVec(knot.val, rope[j-1].val);
        if(distKnotToPrev >= 2){
          knot.prev.x = knot.val.x;
          knot.prev.y = knot.val.y;
          const mDistKnotToPrev = manhattanClampDistVecToVec(knot.val, rope[j-1].val);
          knot.val.x += mDistKnotToPrev.x;
          knot.val.y += mDistKnotToPrev.y;
          if(j === rope.length-1){
            ropeLastKnotPositions[`${knot.val.x},${knot.val.y}`] = true;
          }
        }
      }
    }
  }
  console.log(Object.keys(ropeLastKnotPositions).length);
})();