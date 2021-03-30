var path = new Map();

var everyDaYDAO = require("../dao/everyDayDAO");
var creatTime = require("../util/creatTime");
var resq = require("../util/respUtil");

function editEveryDay(request, response) {
  request.on("data", function (data) {
    everyDaYDAO.insertEveryDay(
      data.toString().trim(),
      creatTime,
      function (result) {
        response.writeHead(200);
        response.write(resq.resq("success", "添加成功", null));
        response.end();
      }
    );
  });
}

function queryEveryDay(request, response) {
  everyDaYDAO.queryEveryDay(
    function (result) {
      response.writeHead(200);
      response.write(resq.resq("success", "添加成功", result));
      response.end();
    }
  );
}

path.set("/editEveryDay", editEveryDay);
path.set("/queryEveryDay", queryEveryDay);
//  /editEveryDay表示路径，editEveryDay表示方法。

module.exports.path = path;
