import { Vec, getInputOfDay, manhattanDist } from "../utils/utils";

interface Sensor {position: Vec, nearestBeacon: Vec}
function parseInput(input: string): Sensor{
  const sIndex0 = 'Sensor at '.length;
  const sIndex1 = input.indexOf(':');
  const sString = input.substring(sIndex0, sIndex1);
  const sArray = sString.replace(/(x=|y=)/g, '').split(',').map(x => parseInt(x));

  const bIndex0 = input.indexOf('beacon is at ')+'beacon is at '.length;
  const bString = input.substring(bIndex0);
  const bArray = bString.replace(/(x=|y=)/g, '').split(',').map(x => parseInt(x));
  
  return {position: {x: sArray[0], y: sArray[1]}, nearestBeacon: {x: bArray[0], y: bArray[1]}};
}

(async () => {
  const data = await getInputOfDay(15);
  const sensors: Sensor[] = data.split(/\r?\n/).map(parseInput);

  const lineY = 2000000;

  let minY = Infinity, maxY = 0;
  const ranges: [number, number][] = [];
  for (const sensor of sensors) {
    const dist = manhattanDist(sensor.position, sensor.nearestBeacon);
    if(Math.abs(sensor.position.y-lineY) < dist){
      const diff = dist-Math.abs(sensor.position.y-lineY);
      const intersectionX0 = sensor.position.x-diff;
      const intersectionX1 = sensor.position.x+diff;

      minY = Math.min(minY, intersectionX0, intersectionX1);
      maxY = Math.max(maxY, intersectionX0, intersectionX1);
      ranges.push([intersectionX0, intersectionX1]);
    }
  }
  
  const line = new Array(maxY-minY+1).fill(0).map(_ => '.');
  for (const range of ranges) {
    for (let i = range[0]; i <= range[1]; i++) {
      let beaconInPosition = false;
      for (const sensor of sensors) {
        if(sensor.nearestBeacon.x === i && sensor.nearestBeacon.y === lineY) beaconInPosition = true;
      }
      if(!beaconInPosition) line[i-minY] = '#';
    }
  }
  console.log((line.join('').match(/#/g) || []).length);

  const maxPosition = 4000000;
  let turningFrequency = -1;
  for (let j = 0; j < sensors.length && turningFrequency<0; j++){
    const sensor = sensors[j];
    const maxDist = manhattanDist(sensor.position, sensor.nearestBeacon)+1;
    for(let i = 0; i < maxDist; i++){
      const positions = [
        {x: sensor.position.x+i, y: sensor.position.y-maxDist+i},
        {x: sensor.position.x-i, y: sensor.position.y+maxDist-i},
        {x: sensor.position.x-maxDist+i, y: sensor.position.y-i},
        {x: sensor.position.x+maxDist-i, y: sensor.position.y+i}
      ].filter(pos => pos.x >= 0 && pos.x <= maxPosition && pos.y >= 0 && pos.y <= maxPosition);

      for (const pos of positions) {
        let detectedByAnySensor = false;
        for (const sensor2 of sensors) {
          const maxDist2 = manhattanDist(sensor2.position, sensor2.nearestBeacon);
          const actualDist = manhattanDist(sensor2.position, {x: pos.x, y: pos.y});
          if(actualDist <= maxDist2){
            detectedByAnySensor = true;
          }
        }
        if(!detectedByAnySensor){
          turningFrequency = pos.x*4000000+pos.y;
        }
      }
    }
  }
  console.log(turningFrequency);
  
})();