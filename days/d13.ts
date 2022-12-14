import { getInputOfDay } from "../utils/utils";

function comparePackets(p1: any, p2: any): number{
  if(!Array.isArray(p1) && !Array.isArray(p2)){ // Both numbers
    return p1-p2;
  }else if(Array.isArray(p1) && Array.isArray(p2)){ // Both lists
    let isCorrect = 0;
    for (let i = 0; i < Math.max(p1.length, p2.length) && isCorrect === 0; i++) {
      if(p1[i] === undefined){
        isCorrect = -1;
      }else if(p2[i] === undefined){
        isCorrect = 1;
      }else{
        isCorrect = comparePackets(p1[i], p2[i])
      }
    }
    return isCorrect;
  }else if(Array.isArray(p1) && !Array.isArray(p2)){ // First list and second number
    return comparePackets(p1, [p2]);
  }else{ // First number and second list
    return comparePackets([p1], p2);
  }
}

(async () => {
  const data = await getInputOfDay(13);
  const packetPairs: any[] = data.split(/\r?\n\r?\n/).map(pair => pair.split(/\r?\n/).map(packet => JSON.parse(packet)));

  let sum = 0;
  for (let i = 0; i < packetPairs.length; i++) {
    const [pair1, pair2] = packetPairs[i];
    const isCorrectPair = comparePackets(pair1, pair2);
    if(isCorrectPair <= 0) sum += (i+1);
  }
  console.log(sum);

  const packets = packetPairs.flatMap(p=>p);
  const d1 = [[2]]
  const d2 = [[6]]
  packets.push(d1);
  packets.push(d2);
  const sortedPackets = packets.sort(comparePackets);
  console.log((sortedPackets.findIndex(p => p===d1)+1)*(sortedPackets.findIndex(p => p===d2)+1));
})();