var DAOuil = require('./DAOuil');

function insertTags(tags, ctime, utime, success) {
    const connection = DAOuil.createconnection()
    var insertQuery = "insert into tags (`tag`, `ctime`, `utime`) values (?,?,?);";
    var params = [tags, ctime, utime];
    connection.query(insertQuery,params , function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('插入数据库出错了')
        }
    })
    connection.end();
}

function queryTags(tag,success) {
    const connection = DAOuil.createconnection();
    var insertQuery = "select * from tags where tag=?;";
    var params = [tag];
    connection.query(insertQuery, params, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}



module.exports.insertTags = insertTags;
module.exports.queryTags = queryTags;


