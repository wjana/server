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


router.post('/search', (req, res) => {
	var sql = $sql.menu.search;
	conn.query(sql, function (err, result) {
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

router.post('/searchAll', (req, res) => {
	var sql = $sql.menu.searchAll;
	conn.query(sql, function (err, result) {
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

router.post('/searchCid', (req, res) => {
	var sql = $sql.menu.searchCid;
	var params = req.body;
	conn.query(sql, params.cid, function (err, result) {
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

router.post('/searchType', (req, res) => {
	var sql = $sql.menu.searchType;
	conn.query(sql, function (err, result) {
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

router.post('/searchCtype', (req, res) => {
	var sqlId = $sql.menu.searchCtype;
	var params = req.body;
	conn.query(sqlId, params.ctype, function (err, result) {
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

router.post('/searchCname', (req, res) => {
	var sqlId = $sql.menu.searchCname;
	var params = req.body;
	conn.query(sqlId, "%"+params.cname+"%", function (err, result) {
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

router.post('/searchMake', (req, res) => {
	var sqlId = $sql.menu.searchMake;
	var params = req.body;
	conn.query(sqlId, params.cid, function (err, result) {
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

router.post('/updateCollect', (req, res) => {
	var sql = $sql.menu.updateCollect;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.collect, params.cid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/searchCauthor', (req, res) => {
	var sqlId = $sql.menu.searchCauthor;
	var params = req.body;
	conn.query(sqlId, params.cauthor, function (err, result) {
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

router.post('/searchExamine', (req, res) => {
	var sqlId = $sql.menu.searchExamine;
	var params = req.body;
	conn.query(sqlId, [params.cauthor,params.examine], function (err, result) {
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

router.post('/searchMenu', (req, res) => {
	var sql = $sql.menu.searchMenu;
	var params = req.body;
	conn.query(sql, [params.cid, "%"+params.cname+"%", params.cauthor], function (err, result) {
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

router.post('/searchMenu1', (req, res) => {
	var sql = $sql.menu.searchMenu1;
	var params = req.body;
	conn.query(sql, [params.cname, params.cauthor], function (err, result) {
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

router.post('/selectAll', (req, res) => {
	var sql = $sql.menu.selectAll;
	conn.query(sql, function (err, result) {
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

router.post('/delete', (req, res) => {
	var sql = $sql.menu.delete;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.cid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/selectState', (req, res) => {
	var sqlId = $sql.menu.selectState;
	conn.query(sqlId, function (err, result) {
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

router.post('/updateExamine', (req, res) => {
	var sql = $sql.menu.updateExamine;
	var params = req.body;
	console.log(params);
	conn.query(sql, params.cid, function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

module.exports = router;