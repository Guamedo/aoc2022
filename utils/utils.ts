import https from 'https';

export function getInputOfDay(day: number): Promise<string>{
    return new Promise((resolve, reject) => {
        const request = https.request({
            host: 'adventofcode.com',
            path: `/2022/day/${day}/input`,
            headers: {
                cookie: process.env.AOC2022_COOKIES
            }
        }, (res) => {
            let inputData = '';
            res.setEncoding('utf8');
            res.on('error', (err) => reject(err));
            res.on('data', (data) => inputData += data);
            res.on('end', () => {resolve(inputData.replace(/\n$/, ''))});
        });
        request.on('error', (err) => reject(err));
        request.end();
    });
}

export interface Vec {x: number, y: number};