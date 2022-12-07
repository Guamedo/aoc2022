import { getInputOfDay } from "../utils/utils";

(async () => {
    const n: number = 14;
    const data = await getInputOfDay(6);
    let marker: number = -1;
    for (let i = n; i < data.length+1 && marker < 0; i++) {
        const cosa = data.substring(i-n, i);
        const arr = [];
        for (let j = n; j > 0; j--) {
            arr.push(cosa.match(new RegExp(data[i-j], 'g'))?.length || 0)
        }
        if(arr.every(e => e <= 1)) marker = i;
    }
    console.log(marker);
})();