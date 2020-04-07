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

//查找接口
router.post('/searchCid', (req, res) => {
	var sql = $sql.step.searchCid;
	var params = req.body;
	conn.query(sql, params.cid, function (err, result) {
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