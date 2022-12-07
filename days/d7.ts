import { getInputOfDay } from "../utils/utils";

(async () => {
    const data = await getInputOfDay(7);

    const terminal = data.split(/\r?\n/);
    const path: string[] = [];
    const dirs: any[] = [{ size: 0, dirs: {}, files: [] }];

    for (const line of terminal) {
        if(line[0] === '$'){
            const [command, arg] = line.substring(2).split(' ');
            switch(command){
                case 'cd':
                    if(arg === '..'){
                        path.pop();
                    }else{
                        path.push(arg);
                    }
                    break;
                case 'ls':
                    break;
                default:
                    console.warn(`Unknown command found: ${command}`);
                    break;
            }
        }else{
            const [info, data] = line.split(' ');
            if(isNaN(parseInt(info))){
                let dir = dirs[0];
                for (let i = 1; i < path.length; i++) {
                    dir = dir.dirs[path[i]];
                }
                dir.dirs[data] = {size: 0, dirs: {}, files: []};
                dirs.push(dir.dirs[data]);
            }else{
                let dir = dirs[0];
                for (let i = 1; i < path.length; i++) {
                    dir.size += parseInt(info);
                    dir = dir.dirs[path[i]];
                }
                dir.files.push(data);
                dir.size += parseInt(info);
            }
        }
    }
    console.log(dirs.map(m => m.size).filter(s => s <= 100000).reduce((acc, val) => acc+val, 0));

    const rootSize = dirs[0].size;
    const aviableSpace = 70000000 - rootSize;
    const spaceForUpdate = 30000000 - aviableSpace;

    console.log(dirs.map(m => m.size).sort((a, b) => a-b).filter(s => s >= spaceForUpdate)[0]);
})();