var DAOuil = require('./DAOuil');

function querySearchMap(success) {
    const connection = DAOuil.createconnection();
    var queryblogDetail = "select * from blog order by id desc;";
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

module.exports.querySearchMap = querySearchMap;



