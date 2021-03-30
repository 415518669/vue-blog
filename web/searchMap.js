var path = new Map();

var searchMapDAO = require("../dao/searchMapDAO");
var creatTime = require("../util/creatTime");
var resq = require("../util/respUtil");

function querySearchMap(request, response) {
  searchMapDAO.querySearchMap(
    function (result) {
      response.writeHead(200);
      response.write(resq.resq("success", "添加成功", result));
      response.end();
    }
  );
}

path.set("/querySearchMap", querySearchMap);

module.exports.path = path;
