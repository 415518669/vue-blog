var DAOuil = require('./DAOuil');

function queryTags(success) {
    const connection = DAOuil.createconnection();
    var insertQuery = "select * from tags;";
    connection.query(insertQuery, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}

function hotBlog(success) {
    const connection = DAOuil.createconnection();
    var insertQuery = "select * from blog order by views desc limit 8;";
    var params = [];
    connection.query(insertQuery, params, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}




module.exports.queryTags = queryTags;
module.exports.hotBlog = hotBlog;



