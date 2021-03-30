var DAOuil = require('./DAOuil');

function insertArticle(title, content,views, tags, ctime, utime, success) {
    const connection = DAOuil.createconnection()
    var insertQuery = "insert into blog(`title`, `content`, `views`, `tags`, `ctime`, `utime`) values (?,?,?,?,?,?);";
    var params = [title, content,views, tags, ctime, utime];
    connection.query(insertQuery,params,  function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('插入数据库出错了');
        }
    })
    connection.end();
}

function queryArticle(page, pageSize, success) {
    const connection = DAOuil.createconnection();
    var insertQuery = "select * from blog order by id desc limit ?,?;";
    var params = [page * pageSize, pageSize];
    connection.query(insertQuery,params, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}


function queryBlogCount(success) {
    const connection = DAOuil.createconnection();
    var insertQuery = "select count(1) as count from blog;";
    connection.query(insertQuery, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}

function juapTags(id,success) {
    const connection = DAOuil.createconnection();
    var insertQuery = "select * from tag_blog_mapping where tag_id = ?;";
    var params = [id];
    connection.query(insertQuery,params, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}

function queryTagsBlog(id,success) {
    const connection = DAOuil.createconnection();
    var insertQuery = "select * from blog where id = ?;";
    var params = [id];
    connection.query(insertQuery,params, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}

module.exports.queryTagsBlog = queryTagsBlog;
module.exports.juapTags = juapTags;
module.exports.insertArticle = insertArticle;
module.exports.queryArticle = queryArticle;
module.exports.queryBlogCount = queryBlogCount;


