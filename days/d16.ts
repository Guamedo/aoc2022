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

interface Valve {id: string, rate: number, next: string[]}
function parseInput(input: string){
  const valveIndex0 = 'Valve '.length;
  const valveIndex1 = input.indexOf(' has');
  const valveId = input.substring(valveIndex0, valveIndex1);

  const rateIndex0 = input.indexOf('rate=')+'rate='.length;
  const rateIndex1 = input.indexOf(';');
  const rate = input.substring(rateIndex0, rateIndex1);
  
  const nextIndex0: any = input.match(/to valves?/);
  const next = input.substring(nextIndex0.index+nextIndex0[0].length);

  return {id: valveId, rate: parseInt(rate), next: next.split(',').map(n => n.trim())};
}

(async () => {
  const valves = test.split(/\r?\n/).map(parseInput);
  console.log(valves);
})();