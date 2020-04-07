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

//查找商品接口
router.post('/search', (req, res) => {
	var sql = $sql.product.search;
	conn.query(sql, function (err, result) {
	    if (err) {
	      console.log(err)
	    }
	    if(result[0]===undefined) {
	    	res.send('-1')    //查询不出id，data返回-1
	    }else {
	    	jsonWrite(res, result);
		}
	})
});

router.post('/searchPname', (req, res) => {
	var sqlId = $sql.product.searchPname;
	var params = req.body;
	conn.query(sqlId, "%"+params.pname+"%", function (err, result) {
	    if (err) {
	      console.log(err)
	    }
	    if(result[0]===undefined) {
	    	res.send('-1')    //查询不出，data返回-1
	    }else {
	    	jsonWrite(res, result);
		}
	})
});

router.post('/searchPid', (req, res) => {
	var sqlId = $sql.product.searchPid;
	var params = req.body;
	conn.query(sqlId, params.pid, function (err, result) {
	    if (err) {
	      console.log(err)
	    }
	    if(result[0]===undefined) {
	    	res.send('-1')    //查询不出，data返回-1
	    }else {
	    	jsonWrite(res, result);
		}
	})
});

router.post('/update', (req, res) => {
	var sql = $sql.product.update;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.pname,params.pimg,params.pinfo,params.price,params.stock,params.weight, params.pid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/add', (req, res) => {
	var sql = $sql.product.add;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.pid,params.pname,params.pimg,params.pinfo,params.price,params.stock,params.weight], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/delete', (req, res) => {
	var sql = $sql.product.delete;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.pid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/updateStock', (req, res) => {
	var sql = $sql.product.updateStock;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.stock, params.pid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

module.exports = router;