var gloableConfig = require('./config');

var fs = require('fs');

var fileList = [];
var listMap = new Map();

var files = fs.readdirSync(gloableConfig['web_path']);
for (let i = 0; i < files.length; i++) {
    var temp = require(`./${gloableConfig['web_path']}/${files[i]}`);
    if(temp.path) {
        for (const [key, value] of temp.path) {
            if(listMap.get(key) == null) {
                listMap.set(key, value);
            }else {
                throw new Error('url异常')
            }
        }
        fileList.push(listMap);
    }
}

module.exports = listMap;