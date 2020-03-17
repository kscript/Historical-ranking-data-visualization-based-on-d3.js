const createDir = require('./').createDir
const config = [];
let rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('请输入要创建的地区名称: ');
rl.prompt();

rl.on('line', (line) => {
    switch (config.length) {
        case 0:
            config.push(line.trim());
            rl.setPrompt('请输入该地区的id: ');
            rl.prompt();
            break
        case 1:
            if (!isNaN(line.trim())) {
                config.push(line.trim());
                rl.setPrompt('是否为省级行政单位? 如果是输入1: ');
            }
            rl.prompt();
            break;
        case 2:
            config.push(parseInt(line) === 1);
            rl.setPrompt('请输入处理间隔时间(可空, 毫秒): ');
            rl.prompt();
            break;
        case 3: 
            config.push(parseInt(line) || 0);
            rl.close();
            break;
        default: break;
    }

});

rl.on('close', async () => {
    await createDir(config);
    process.exit(0);
});