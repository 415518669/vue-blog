var DAOuil = require('./DAOuil');

function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    const connection = DAOuil.createconnection()
    var insertQuery = "insert into tag_blog_mapping (`tag_id`, `blog_id` , `ctime`, `utime`) values (?,?,?,?);";
    var params = [tagId, blogId, ctime, utime];
    connection.query(insertQuery,params , function (err, result) {
        if(err == null ) {
            success(result)
        }else {
            throw new Error('插入数据库出错了')
        }
    })
    connection.end();
}

// function queryTagBlogMapping(tag,success) {
//     const connection = DAOuil.createconnection();
//     var insertQuery = "select * from tags where tag = ?;";
//     var params = [tag];
//     connection.query(insertQuery, params, function (err, result) {
//         if(err == null ) {
//             success(result)
//         }else {
//             throw new Error('数据库出错了')
//         }
//     })
//     connection.end();
// }

module.exports.insertTagBlogMapping = insertTagBlogMapping;
// module.exports.queryTagBlogMapping = queryTagBlogMapping;

