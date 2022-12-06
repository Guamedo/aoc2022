import https from 'https';
import { cookies } from '../config/config';

export function getInputOfDay(day: number): Promise<string>{
    return new Promise((resolve, reject) => {
        const request = https.request({
            host: 'adventofcode.com',
            path: `/2022/day/${day}/input`,
            headers: {
                cookie: cookies
            }
        }, (res) => {
            res.setEncoding('utf8');
            res.on('error', (err) => reject(err));
            res.on('data', (data) => resolve(data));
        });
        request.on('error', (err) => reject(err));
        request.end();
    });
}