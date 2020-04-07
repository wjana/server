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

router.post('/add', (req, res) => {
	var sql = $sql.orderDetails.add;
	var params = req.body;
	conn.query(sql, [params.oid,params.pid,params.opimg,params.pname,params.opnum,params.oprice,params.total], function (err, result) {
	    if (err) {
	      console.log(err)
	    }else {
	    	jsonWrite(res, result);
		}
	})
});

router.post('/searchOid', (req, res) => {
	var sql = $sql.orderDetails.searchOid;
	var params = req.body;
	conn.query(sql, params.oid, function (err, result) {
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

router.post('/searchOrder', (req, res) => {
	var sql = $sql.orderDetails.searchOrder;
	var params = req.body;
	conn.query(sql, params.uid, function (err, result) {
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

module.exports = router;