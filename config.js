var fs = require('fs');

var gloableConfig = {};

var conf = fs.readFileSync("./serve.conf");

var configArr = conf.toString().split('\r\n');

for (let i = 0; i < configArr.length; i++) {
    gloableConfig[configArr[i].split('=')[0]] = configArr[i].split('=')[1];
}

module.exports = gloableConfig;