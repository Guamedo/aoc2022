import https from 'https';
import path from 'path';
import fs from 'fs';

export function getInputOfDay(day: number): Promise<string>{
    const filePath = path.join(__dirname, `../inputs/input${day}.txt`);
    if(fs.existsSync(filePath)){
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8',(err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(data.replace(/\n$/, ''));
                }
            });
        });
    }else{
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
                res.on('end', () => {
                    fs.writeFileSync(filePath, inputData.replace(/\n$/, ''));
                    resolve(inputData.replace(/\n$/, ''))
                });
            });
            request.on('error', (err) => reject(err));
            request.end();
        });
    }

}

export interface Vec {x: number, y: number};
export interface Vec3 {x: number, y: number, z: number};

export function euclideanDist(p1: Vec, p2: Vec): number{
    return Math.sqrt((p2.x-p1.x)**2 + (p2.y-p1.y)**2);
}

export function manhattanDist(p1: Vec, p2: Vec): number{
    return Math.abs(p2.x-p1.x)+Math.abs(p2.y-p1.y);
}

export function deepCopy(obj: any){
    return JSON.parse(JSON.stringify(obj));
}

export function negativeMod(n: number, m: number) {
    return ((n % m) + m) % m;
}