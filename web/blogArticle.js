var path = new Map();

var url = require("url");
var ArticleDAO = require("../dao/ArticleDAO");
var tagDAO = require("../dao/tagsDAO");
var TagBlogMappingDAO = require("../dao/TagBlogMappingDAO");
var creatTime = require("../util/creatTime");
var resq = require("../util/respUtil");

function editBlog(request, response) {
  request.on("data", function (data) {
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g, "").replace(/，/g, ",");
    ArticleDAO.insertArticle(
      params.title,
      data.toString().trim(),
      0,
      tags,
      creatTime,
      creatTime,
      function (result) {
        response.writeHead(200);
        response.write(resq.resq("success", "添加成功", null));
        response.end();
        var blogId = result.insertId;
        var tagsList = tags.split(",");

        for (let i = 0; i < tagsList.length; i++) {
          if (tagsList[i] == "") {
            continue;
          }
          queryTag(tagsList[i], blogId);
        }
      }
    );
  });
}

function queryTag(tag, blogId) {
  tagDAO.queryTags(tag, function (result) {
    if (result == null || result.length == 0) {
      insertTags(tag, blogId);
    } else {
      insertTagBlogMapping(result[0].id, blogId);
    }
  });
}

function insertTags(tag, blogId) {
  tagDAO.insertTags(tag, creatTime, creatTime, function (result) {
    var tagId = result.insertId;
    insertTagBlogMapping(tagId, blogId);
  });
}

function insertTagBlogMapping(tagId, blogId) {
  TagBlogMappingDAO.insertTagBlogMapping(
    tagId,
    blogId,
    creatTime,
    creatTime,
    function (result) {}
  );
}

function queryBlog(request, response) {
  var params = url.parse(request.url, true).query;
  var page = params.page;
  var pageSize = params.pageSize;
  var id = params.tags_id;
  if (!id) {
    ArticleDAO.queryArticle(
      parseInt(page),
      parseInt(pageSize),
      function (result) {
        for (let i = 0; i < result.length; i++) {
          result[i].content = result[i].content.replace(/<img[\w\W]*">/g, "");
        }
        response.writeHead(200);
        response.write(resq.resq("success", "查询成功", result));
        response.end();
      }
    );
  } else {
    ArticleDAO.juapTags(id, function (result) {
      response.writeHead(200);
      response.write(resq.resq("success", "查询成功", result));
      response.end();
    });
  }
}

function queryBlogCount(request, response) {
  
  ArticleDAO.queryBlogCount(function (result) {
    response.writeHead(200);
    response.write(resq.resq("success", "查询成功", result));
    response.end();
  });
}
function queryTagsBlog(request, response) {
  var params = url.parse(request.url, true).query;
  var id = params.id
  ArticleDAO.queryTagsBlog(id,function (result) {
    for (let i = 0; i < result.length; i++) {
      result[i].content = result[i].content.replace(/<img[\w\W]*">/g, "");
    }
    response.writeHead(200);
    response.write(resq.resq("success", "查询成功", result));
    response.end();
  });
}

path.set("/editBlog", editBlog);
path.set("/queryBlog", queryBlog);
path.set("/queryBlogCount", queryBlogCount);
path.set("/queryTagsBlog", queryTagsBlog);

module.exports.path = path;
