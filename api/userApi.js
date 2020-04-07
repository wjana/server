//api文件夹为与数据库的各个表连接接口，每一个子文件为一个数据库中的一个表
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

// 增加用户接口
router.post('/addUser', (req, res) => {
	var sqlId = $sql.user.searchId;
  var sql = $sql.user.add;
  var params = req.body;
  console.log(params);
  conn.query(sqlId, params.uid, function(err, result) {
    if(err) {
      console.log(err);
    }
    if(result[0]===undefined) {
			conn.query(sql,[params.uid,params.uname,params.passwd], function(err, result) {
		    if(err) {
		      console.log(err);
		    }
		    if(result) {
		      jsonWrite(res, result);
		    }
			})
    }else {
      res.send('-1')    //当前注册uid与数据库重复时，data返回-1
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

//修改用户地址
router.post('/updateAddr', (req, res) => {
	var sql = $sql.user.updateAddr;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.address, params.uid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/updateMoney', (req, res) => {
	var sql = $sql.user.updateMoney;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.money, params.uid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/updateBaseInfo', (req, res) => {
	var sql = $sql.user.updateBaseInfo;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.uimg, params.uname, params.sex, params.uid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/updatePw', (req, res) => {
	var sql = $sql.user.updatePw;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.passwd, params.uid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/updatePaypw', (req, res) => {
	var sql = $sql.user.updatePaypw;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.paypasswd, params.uid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

//删除用户
router.post('/delete', (req, res) => {
	var sql = $sql.user.delete;
	var params = req.body;
	conn.query(sql, [params.uid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/selectUser', (req, res) => {
	var sqlId = $sql.user.selectUser;
	conn.query(sqlId, function (err, result) {
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

router.post('/selectID', (req, res) => {
	var sql = $sql.user.selectID;
	var params = req.body;
	conn.query(sql, [params.uid, "%"+params.uname+"%"], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

module.exports = router;
