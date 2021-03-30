var DAOuil = require('./DAOuil');

function insertEveryDay(content, ctime, success) {
    const connection = DAOuil.createconnection()
    connection.query("insert into every_day(`content`, `ctime`) values ('" +content + "','" + ctime +  "')", function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('插入数据库出错了')
        }
    })
    connection.end();
}

function queryEveryDay(success) {
    const connection = DAOuil.createconnection();
    connection.query("select * from every_day order by id desc limit 1", function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;

