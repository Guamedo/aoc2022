import { getInputOfDay } from "../utils/utils";

interface Valve {id: string, rate: number, next: string[], dist: any}
function parseInput(input: string){
  const valveIndex0 = 'Valve '.length;
  const valveIndex1 = input.indexOf(' has');
  const valveId = input.substring(valveIndex0, valveIndex1);

  const rateIndex0 = input.indexOf('rate=')+'rate='.length;
  const rateIndex1 = input.indexOf(';');
  const rate = input.substring(rateIndex0, rateIndex1);
  
  const nextIndex0: any = input.match(/to valves?/);
  const next = input.substring(nextIndex0.index+nextIndex0[0].length);

  return {id: valveId, rate: parseInt(rate), next: next.split(',').map(n => n.trim()), dist: {}};
}

(async () => {

  const test = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
  Valve BB has flow rate=13; tunnels lead to valves CC, AA
  Valve CC has flow rate=2; tunnels lead to valves DD, BB
  Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
  Valve EE has flow rate=3; tunnels lead to valves FF, DD
  Valve FF has flow rate=0; tunnels lead to valves EE, GG
  Valve GG has flow rate=0; tunnels lead to valves FF, HH
  Valve HH has flow rate=22; tunnel leads to valve GG
  Valve II has flow rate=0; tunnels lead to valves AA, JJ
  Valve JJ has flow rate=21; tunnel leads to valve II`;

  const data = await getInputOfDay(16);
  const valves = data.split(/\r?\n/).map(parseInput);

  // Calculate the time cost for moving between each valve pair
  for (let i = 0; i < valves.length; i++) {
    const startValve = valves[i];
    for (let j = 0; j < valves.length; j++) {
      if(j !== i){
        const endValve = valves[j];
        (startValve.dist as any)[endValve.id] = 0;
        
        const distToValve = Object.fromEntries(valves.map((v) => [v.id, Infinity]));

        const openSet = [startValve];
        distToValve[startValve.id] = 0;
        let end = false;
        while(openSet.length && !end){
          const valve: Valve = openSet.shift() as Valve;
          if(valve.id === endValve.id){
            end = true;
            (startValve.dist as any)[endValve.id] = distToValve[valve.id];
          }else{
            const newSet = valve.next.filter(vId => distToValve[vId] > distToValve[valve.id]+1).map(vId => valves.find(v => v.id === vId)) as Valve[];
            newSet.forEach(v => distToValve[v.id] = distToValve[valve.id]+1);
            openSet.push(...newSet);
          }
        }
      }
    }
  }
  
  const valvesWithRate = valves.filter(v => v.rate > 0).sort((a, b) => b.rate-a.rate).map(v => v.id);
  let maxValue = 0;

  function dfs(valve: Valve, path: Valve[], time: number = 30, value: number = 0){
    const nextValves = valvesWithRate.filter(vId => !path.find(v => v.id === vId)).map(vId => valves.find(v => v.id === vId)) as Valve[];
    if(time <= 0) return;
    for(const nextValve of nextValves){
      dfs(nextValve, [...path, nextValve], time-(valve.dist[nextValve.id]+1), value+nextValve.rate*(time-(valve.dist[nextValve.id]+1)));
    }
    maxValue = Math.max(maxValue, value);
  }

  dfs(valves.find(v => v.id === 'AA') as Valve, []);
  console.log(maxValue);

})();