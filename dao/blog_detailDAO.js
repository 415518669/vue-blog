var DAOuil = require('./DAOuil');


function insertComment(blog_id, parent,parent_name,username,comment, email, ctime, utime, success) {
    const connection = DAOuil.createconnection()
    var insertQuery = "insert into comments(`blog_id`, `parent`, `parent_name`, `username`, `comment`, `email`, `ctime`, `utime`) values (?,?,?,?,?,?,?,?);";
    var params = [blog_id, parent,parent_name,username,comment, email, ctime, utime];
    connection.query(insertQuery,params,  function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('插入数据库出错了');
        }
    })
    connection.end();
}

function blogDetail(id, success) {
    const connection = DAOuil.createconnection();
    var queryblogDetail = "select * from blog where id = ?;";
    var params = [id];
    connection.query(queryblogDetail,params, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}

function addViews(id, success) {
    const connection = DAOuil.createconnection();
    var queryblogDetail = "update blog set views = views + 1 where id = ?;";
    var params = [id];
    connection.query(queryblogDetail,params, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}

function queryCommentsBlogId(id, success) {
    const connection = DAOuil.createconnection();
    var queryblogDetail = "select * from comments where blog_id = ?;";
    var params = [id];
    connection.query(queryblogDetail,params, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}

function queryCommentCount(id, success) {
    const connection = DAOuil.createconnection();
    var queryblogDetail = "select count(1) as count from comments where blog_id = ?;";
    var params = [id];
    connection.query(queryblogDetail,params, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}

function newComment( success) {
    const connection = DAOuil.createconnection();
    var queryblogDetail = "select * from comments order by ctime desc limit 4";
    var params = [];
    connection.query(queryblogDetail,params, function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('数据库出错了')
        }
    })
    connection.end();
}


module.exports.blogDetail = blogDetail;
module.exports.newComment = newComment;
module.exports.addViews = addViews;
module.exports.queryCommentCount = queryCommentCount;
module.exports.insertComment = insertComment;
module.exports.queryCommentsBlogId = queryCommentsBlogId;



