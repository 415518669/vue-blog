var express = require("express");
var gloableConfig = require("./config");

var loader = require('./loader');

var app = new express();

app.use(express.static("./page/")) //静态资源存放处。

app.post('/editEveryDay', loader.get('/editEveryDay'));
app.get('/queryEveryDay', loader.get('/queryEveryDay'));
app.post('/editBlog', loader.get('/editBlog'));
app.get('/queryBlog', loader.get('/queryBlog'));
app.get('/queryBlogCount', loader.get('/queryBlogCount'));
app.get('/blogDetail', loader.get('/blogDetail'));
app.post('/insertComment', loader.get('/insertComment'));
app.get('/commentSvg', loader.get('/commentSvg'));
app.get('/queryCommentsBlogId', loader.get('/queryCommentsBlogId'));
app.get('/queryCommentCount', loader.get('/queryCommentCount'));
app.get('/querySearchMap', loader.get('/querySearchMap'));
app.get('/queryTags', loader.get('/queryTags'));
app.get('/hotBlog', loader.get('/hotBlog'));
app.get('/newComment', loader.get('/newComment'));
app.get('/queryTagsBlog', loader.get('/queryTagsBlog'));







app.listen(gloableConfig.prot, function () {
    console.log('连接成功');
})