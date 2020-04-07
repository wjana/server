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

// 增加用户地址接口
router.post('/addAddress', (req, res) => {
//var sqlId = $sql.user.searchUid;
  var sql = $sql.user.add;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.uid,params.address,params.receiptName], function(err, result) {
    if(err) {
      console.log(err);
    }
    if(result) {
      jsonWrite(res, result);
    }
  }) 
});

//查找用户接口
router.post('/searchUser', (req, res) => {
//	var sqlName = $sql.user.searchName;
	var sqlPasswd = $sql.user.searchPasswd;
	var sqlId = $sql.user.searchId;
	var params = req.body;
	conn.query(sqlId, params.uid, function (err, result) {
    if (err) {
      console.log(err)
    }
    if(result[0]===undefined) {
    	res.send('-1')    //查询不出uid，data返回-1
    }else {
    	conn.query(sqlPasswd, params.passwd, function(err, result) {
				if(err) {
				  console.log(err);
				}
				if(result[0]===undefined) {
				  res.send('0');    //uid正确后，password错误，data返回 0
				}else {
				  jsonWrite(res, result);
				}
    	})
    }
	})
});

router.post('/searchUid', (req, res) => {
	var sqlId = $sql.user.searchId;
	var params = req.body;
	conn.query(sqlId, params.uid, function (err, result) {
    if (err) {
      console.log(err)
    }
    if(result[0]===undefined) {
    	res.send('-1')    //查询不出uid，data返回-1
    }else {
    	jsonWrite(res, result);
		}
	})
});

//取消读者
//router.post('/cancelReader', (req, res) => {
//	var sql = $sql.reader.delete;
//	var params = req.body;
//	console.log(params);
//	conn.query(sql, [params.name], function (err, result) {
//		if (err) {
//		  console.log(err);
//		}
//		if (result) {
//		  jsonWrite(res, result);
//		}
//	})
//});

module.exports = router;
