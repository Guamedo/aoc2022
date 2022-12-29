import { getInputOfDay, base5ToSnifu } from "../utils/utils";

const test = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

const dic: any = {'2': 2, '1': 1, '0': 0, '-': -1, '=': -2};

(async () => {
  const data = await getInputOfDay(25);
  const val = data.split('\n').map((x) => x.split('').reverse().map((y, i) => dic[y]*5**i).reduce((a, v) => a+v, 0)).reduce((a, v)=> a+v, 0)
  console.log(base5ToSnifu(val.toString(5)));
})();