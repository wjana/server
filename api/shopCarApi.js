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
router.post('/searchShopCar', (req, res) => {
	var sqlId = $sql.shopCar.searchUid;
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

router.post('/searchPid', (req, res) => {
	var sqlId = $sql.shopCar.searchPid;
	var params = req.body;
	conn.query(sqlId, params.pid, function (err, result) {
	    if (err) {
	      console.log(err)
	    }
	    if(result[0]===undefined) {
	    	res.send('-1')    //查询不出pid，data返回-1
	    }else {
	    	jsonWrite(res, result);
		}
	})
});

//修改商品数量
router.post('/updatePnum', (req, res) => {
	var sql = $sql.shopCar.updatePnum;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.pnum, params.pid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

//删除商品
router.post('/deleteProduct', (req, res) => {
	var sql = $sql.shopCar.delete;
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

router.post('/count', (req, res) => {
	var sqlId = $sql.shopCar.count;
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

//添加购物车
router.post('/add', (req, res) => {
	var sqlId = $sql.shopCar.searchPid;
  var sql = $sql.shopCar.add;
  var params = req.body;
  console.log(params);
  conn.query(sqlId, params.pid, function(err, result) {
    if(err) {
      console.log(err);
    }
    if(result[0]===undefined) {
			conn.query(sql,[params.uid,params.pid,params.pnum], function(err, result) {
		    if(err) {
		      console.log(err);
		    }
		    if(result) {
		      jsonWrite(res, result);
		    }
			})
    }else {
      res.send('-1')    //当前pid与数据库重复时，data返回-1
    }
  }) 
});

module.exports = router;