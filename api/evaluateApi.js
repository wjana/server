var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function (res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  }else {
    res.json(ret)
  }
};

router.post('/searchPid', (req, res) => {
	var sql = $sql.evaluate.searchPid;
	var params = req.body;
	conn.query(sql, params.pid, function (err, result) {
	    if (err) {
	      console.log(err)
	    }
	    if(result[0]===undefined) {
	    	res.send('-1')    //查询不出cid，data返回-1
	    }else {
	    	jsonWrite(res, result);
		}
	})
});

router.post('/add', (req, res) => {
  var sql = $sql.evaluate.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.pid, params.uid, params.img, params.evaluation, params.time], function(err, result) {
    if(err) {
      	console.log(err);
    }
    if(result) {
      	jsonWrite(res, result);
    }
  }) 
});

module.exports = router;