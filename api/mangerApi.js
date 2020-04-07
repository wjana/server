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

// 增加管理员接口
router.post('/addMan', (req, res) => {
  var sql = $sql.manger.addMan;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.mid, params.mname, params.mpasswd, params.sex, params.phone, params.power], function(err, result) {
    if(err) {
      	console.log(err);
    }
    if(result) {
      	jsonWrite(res, result);
    }
  }) 
});

//登录
router.post('/searchMid', (req, res) => {
	var sqlPasswd = $sql.manger.searchMpasswd;
	var sqlId = $sql.manger.searchMid;
	var params = req.body;
	conn.query(sqlId, params.mid, function (err, result) {
	    if (err) {
	      console.log(err)
	    }
	    if(result[0]===undefined) {
	    	res.send('-1')    //查询不出id，data返回-1
	    }else {
	    	conn.query(sqlPasswd, params.mpasswd, function(err, result) {
					if(err) {
					  console.log(err);
					}
					if(result[0]===undefined) {
					  res.send('0');    //id正确后，password错误，data返回 0
					}else {
					  jsonWrite(res, result);
					}
	    	})
	    }
	})
});

//查找用户接口
router.post('/searchManger', (req, res) => {
	var sqlId = $sql.manger.searchMid;
	var params = req.body;
	conn.query(sqlId, params.mid, function (err, result) {
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


router.post('/updateMinfo', (req, res) => {
	var sql = $sql.manger.updateMinfo;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.mname, params.sex, params.phone, params.power, params.mid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

//修改密码
router.post('/updateMpw', (req, res) => {
	var sql = $sql.manger.updateMpw;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.mpasswd, params.mid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

//删除
router.post('/deleteManger', (req, res) => {
	var sql = $sql.manger.deleteMid;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.mid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/search', (req, res) => {
	var sqlId = $sql.manger.search;
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

router.post('/selectMan', (req, res) => {
	var sqlId = $sql.manger.selectMan;
	var params = req.body;
	conn.query(sqlId, [params.mid, "%"+params.mname+"%"], function (err, result) {
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

module.exports = router;
