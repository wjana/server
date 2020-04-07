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
	var sql = $sql.userOrder.add;
	var sqlId = $sql.userOrder.id;
	var params = req.body;
	conn.query(sql, [params.uid,params.oaddress,params.phone, params.state, params.time], function (err, result) {
	    if (err) {
	      console.log(err)
	    }else {
	    	conn.query(sqlId, function (err, result) {
	    		if (err) {
			      console.log(err)
			    }
			    if(result[0]===undefined) {
			    	res.send('-1')
			    }else {
			    	jsonWrite(res, result);
					}
	    	})
		}
	})
});

//
//router.post('/searchPname', (req, res) => {
//	var sqlId = $sql.product.searchPname;
//	var params = req.body;
//	conn.query(sqlId, "%"+params.pname+"%", function (err, result) {
//	    if (err) {
//	      console.log(err)
//	    }
//	    if(result[0]===undefined) {
//	    	res.send('-1')    //查询不出，data返回-1
//	    }else {
//	    	jsonWrite(res, result);
//		}
//	})
//});

router.post('/searchUid', (req, res) => {
	var sql = $sql.userOrder.searchUid;
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

router.post('/updateState', (req, res) => {
	var sql = $sql.userOrder.updateState;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.state, params.oid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/selectOrder', (req, res) => {
	var sql = $sql.userOrder.selectOrder;
	var params = req.body;
	conn.query(sql, [params.oid, params.uid], function (err, result) {
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

router.post('/selectAll', (req, res) => {
	var sql = $sql.userOrder.selectAll;
	conn.query(sql,function (err, result) {
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