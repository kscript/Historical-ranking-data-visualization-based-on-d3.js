const fs = require('fs');
const qs = require('qs');
const path = require('path');
const https = require('https');
const readline = require('readline');
const fsLoader = require('ks-file-loader').default;
const dir = 'src/csv/people_move';
const mkdirsSync = (dir) => {
    if (fs.existsSync(dir)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dir))) {
            fs.mkdirSync(dir);
            return true;
        }
    }
}
const getData = async (option, startDate = '2020-01-01') => {
    let list = [];
    let start = +new Date(startDate);
    let end = +new Date();
    let current = 0;
    let t = 0
    option = Object.assign({
        dt: 'province',
        id: 420000,
        type: 'move_out'
    }, option)
    while(start + current < end) {
        let day = new Date(start + current);
        let newOption = Object.assign({}, option || {}, {
            dateText: day.getFullYear() + '年' + (day.getMonth() + 1) + '月'+ day.getDate() + '日',
            date: [day.getFullYear(), ('0' + (day.getMonth() + 1)).slice(-2),  ('0' + day.getDate()).slice(-2)].join('')
        })
        current += 60 * 60 * 24 * 1000;
        list.push(new Promise(resolve => 
            setTimeout(() => {
                resolve(
                    move_map(newOption)
                    )
                }, t += 50)
            )
        )
    }
    return list;
}
const move_map = async (opt) => {
    opt = Object.assign({}, opt);
    let u = opt.u;
    delete opt.u;
    let url = `https://huiyan.baidu.com/migration/${u}rank.jsonp?${qs.stringify(opt, {
        charsetSentinel: true
    })}`;
    return new Promise(resolve => {
        https.get(url, (res) => {
            let content = "";
            res.on("data", (data) => {
                content += data;
            });
            res.on("end", () => {
                try{
                    let json = JSON.parse(content.slice(3, -1));
                    if (json.data) {
                        json.data.data = opt;
                        resolve(json.data);
                    } else {
                        resolve({
                            data: opt,
                            list: []
                        })
                    }
                } catch(e) {
                    console.log(e);
                    resolve({
                        data: opt,
                        list: []
                    })
                }
                // console.log(url);
            });
        }).on("error", (err) => {
            console.log(err)
        });
    })
}
const toCsv = async (list, opt) => {
    opt = Object.assign({
        dt: 'province',
        id: 420000,
        type: 'move_out'
    }, opt);
    let { id, dt, type, u} = opt;
    let datas = await Promise.all(list);
    let res = datas.map(({
            data,
            list
        }) => {
        return list.map(item => [
            item.province_name,
            item.city_name,
            item.value,
            data.dateText
        ].join(',')).join('\n')
    }).join('\n');
    let pre = `# id:${id} dt:${dt} type:${type} u:${u}` + '\ntype,name,value,date\n';
    if (u === 'province') {
        pre = pre.replace(/type,/, '');
        res = res.replace(/,,/g, ',');
    }
    res = pre + res;
    return res;
}
const createDir = ([ name, id, province, defer ]) => {
    let targetDir = path.join(dir, name);
    mkdirsSync(targetDir);
    return fsLoader({
        path: path.join(process.cwd(), 'server/people_move/template'),
        ext: 'csvx',
        readFile: true,
        loader: async (stats, data, next) => {
            let targetName = stats.name.replace(/%name%/, name);
            let opt = {
                id,
                dt: province ? 'province' : 'city',
                u: /分省/.test(stats.name) ? 'province' : 'city',
                type: /迁入/.test(stats.name) ? 'move_in' : 'move_out',
            }
            let csv = await toCsv(await getData(opt), opt);
            let text = data.toString().replace(/%name%/, name) + '\n' + csv;
            return new Promise(resolve => {
                fs.writeFile(path.join(targetDir, targetName + '.csvx'), text, (...rest) => {
                    setTimeout(resolve, defer || 0);
                });
            })
        }
    })
}
module.exports = {
    createDir
}