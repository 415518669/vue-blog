var path = new Map();
var url = require("url");
var creatTime = require("../util/creatTime");
var svg = require('svg-captcha');

var blog_detailDAO = require("../dao/blog_detailDAO");
var resq = require("../util/respUtil");

function insertComment(request, response) {
  request.on("data", function (data) {
    var params = data.toString();
    var data = JSON.parse(params);
    var { parent, blog_id, username, email, comment, parent_name } = data;
    blog_detailDAO.insertComment(
      blog_id,
      parent,
      parent_name,
      username,
      comment,
      email,
      creatTime,
      creatTime,
      function (result) {
        response.writeHead(200);
        response.write(resq.resq("success", "添加成功", null));
        response.end();
      }
    );
  });
}

function commentSvg(request, response) {
  var img = svg.create({fontSize: 50 ,height:35, width: 100});
  response.writeHead(200)
  response.write(resq.resq("success", "", img))
  response.end();
}

function blogDetail(request, response) {
  var params = url.parse(request.url, true).query;
  var id = parseInt(params.bid);
  blog_detailDAO.blogDetail(id, function (result) {
    response.writeHead(200);
    response.write(resq.resq("success", "查询成功", result));
    response.end();
    blog_detailDAO.addViews(id, function () {})
  });
}

function queryCommentsBlogId(request, response) {
  var params = url.parse(request.url, true).query;
  var id = parseInt(params.blog_id);
  blog_detailDAO.queryCommentsBlogId(id, function (result) {
    response.writeHead(200);
    response.write(resq.resq("success", "查询成功", result));
    response.end();
  });
}

function queryCommentCount(request, response) {
  var params = url.parse(request.url, true).query;
  var id = parseInt(params.blog_id);
  blog_detailDAO.queryCommentCount(id, function (result) {
    response.writeHead(200);
    response.write(resq.resq("success", "查询成功", result));
    response.end();
  });
}
function newComment(request, response) {
  blog_detailDAO.newComment(function (result) {
    response.writeHead(200);
    response.write(resq.resq("success", "查询成功", result));
    response.end();
  });
}

path.set("/newComment", newComment);
path.set("/blogDetail", blogDetail);
path.set("/insertComment", insertComment);
path.set("/commentSvg", commentSvg);
path.set("/queryCommentsBlogId", queryCommentsBlogId);
path.set("/queryCommentCount", queryCommentCount);



//  /editEveryDay表示路径，editEveryDay表示方法。

module.exports.path = path;
