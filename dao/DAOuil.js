const mysql = require('mysql');

function createconnection() {
    const connection = mysql.createConnection({
        host: "127.0.0.1",  //主机 或者 127.0.0.1
        password: "Qin123#", // mysql密码
        user: "root", // 账号
        database: "my-blog" // 哪个数据库
    })
    return connection;
}

module.exports.createconnection = createconnection;

