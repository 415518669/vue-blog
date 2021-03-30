var path = new Map();
var resq = require("../util/respUtil");
var queryTagsDAO = require("../dao/queryTagsDAO");
var url = require("url");

function queryTags(request, response) {
  queryTagsDAO.queryTags(function (result) {
    response.writeHead(200);
    response.write(resq.resq("success", "查询成功", result));
    response.end();
  });
}

function hotBlog(request, response) {
    queryTagsDAO.hotBlog(function (result) {
      response.writeHead(200);
      response.write(resq.resq("success", "查询成功", result));
      response.end();
    });
}



  
path.set("/queryTags", queryTags);
path.set("/hotBlog", hotBlog);

//  /editEveryDay表示路径，editEveryDay表示方法。

module.exports.path = path;
