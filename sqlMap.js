//实现sql语句的api
var sqlMap = {
  // 用户
  user: {
  	selectUser: 'select uid,uname,sex,address from user',
  	selectID: 'select uid,uname,sex,address from user where uid = ? or uname like ?',
    add: 'insert into user(uid,uname,passwd) values(?, ?, ?)',
    searchId: 'select * from user where uid = ?',//查找uid
    searchName: 'select * from user where uname = ?',//查找uname
    searchPasswd: 'select * from user where passwd = ?',//查找passwd
    updateAddr: 'update user set address = ? where uid = ?',
    updateMoney: 'update user set money = ? where uid = ?',
    searchPayPasswd: 'select paypasswd, money from user where uid = ?',
    updateBaseInfo: 'update user set uimg = ?, uname = ?, sex = ? where uid = ?',
    updatePw: 'update user set passwd = ? where uid = ?',
    updatePaypw: 'update user set paypasswd = ? where uid = ?',
    delete: 'delete from user where uid = ?'
  },
  // 管理员
  manger: {
    addMan: 'insert into manger(mid,mname,mpasswd,sex,phone,power) values(?, ?, ?, ?, ?, ?)',
    search: 'select mid, mname, phone, sex, power from manger',
    searchMid: 'select * from manger where mid = ?',
    searchMname: 'select * from manger where mname = ?',
    searchMpasswd: 'select * from manger where mpasswd = ?',
    updateMinfo: 'update manger set mname = ?, sex = ?, phone = ?, power = ? where mid = ?',
    updateMpw: 'update manger set mpasswd = ? where mid = ?',
    deleteMid: 'delete from manger where mid = ?',
    selectMan: 'select mid, mname, phone, sex, power from manger where mid = ? or mname like ?',
  },
  //商品
	product: {
    add: 'insert into product(pid,pname,pimg,pinfo,price,stock,weight) values (?,?,?,?,?,?,?)',
    delete: 'delete from product where pid = ?',
    search: 'select * from product order by CONVERT(pid,SIGNED)',
    searchPid: 'select * from product where pid = ?', 
    searchPname: 'select * from product where pname like ?', 
    updatePrice: 'update product set price = ? where pid = ?',
    update: 'update product set pname = ?,pimg = ?,pinfo = ?,price = ?,stock = ?,weight = ? where pid = ?',
    updateStock: 'update product set stock = ? where pid = ?',
	},
	//用户购物车列表
	shopCar: {
    add: 'insert into shopCar(uid, pid, pnum) values (?, ?, ?)',
    delete: 'delete from shopCar where pid = ?',
    searchUid: 'select * from shopCar,product where uid = ? and shopCar.pid=product.pid',
    searchPid: 'select * from shopCar where pid = ?',
    updatePnum: 'update shopCar set pnum = ? where pid = ?',
    count: 'select count(*) as count from shopCar'
	},
	//菜单列表
	menu: {
    add: 'insert into menu(cid, cname, ctype, cauthor) values (?, ?, ?, ?)',
    delete: 'delete from menu where cid = ?',
    search: 'select * from menu where examine = "审核通过"',
    searchAll: 'select * from menu',
    searchType: 'select distinct ctype from menu',
    searchCid: 'select * from menu where cid = ?',
    searchCtype: 'select * from menu where ctype = ? and examine = "审核通过"',
    searchCname: 'select * from menu where cname like ? and examine = "审核通过"',
    searchMake: 'select makeImg, make from menu where cid = ?',
    updateCollect: 'update menu set collect = ? where cid = ?',
    searchCauthor: 'select count(*) as menus from menu where cauthor = ?',
    searchExamine: 'select * from menu where cauthor = ? and examine = ?',
    searchMenu: 'select * from menu where cid = ? or cname like ? or cauthor = ?',
    searchMenu1: 'select * from menu where cname = ? or cauthor = ?',
    selectAll: 'select * from menu,step,material where menu.cid=step.cid and menu.cid=material.cid',
    selectState: 'select * from menu where examine = "未审核"',
    updateExamine: 'update menu set examine = "审核通过" where cid = ?',
	},
	//用户地址列表
	address: {
    add: 'insert into address(uid, address, receiptName) values (?, ?, ?)',
    delete: 'delete from address where address = ?',
    searchUid: 'select * from address where uid = ?'
	},
	//材料表
	material: {
		add: 'insert into material(cid, things, weight) values (?, ?, ?)',
    deleteCid: 'delete from material where cid = ?',
    searchCid: 'select * from material where cid = ?'
	},
	step: {
		add: 'insert into step(cid, stepNum, stepImg, stepInfo) values (?, ?, ?, ?)',
    deleteCid: 'delete from step where cid = ?',
    searchCid: 'select * from step where cid = ?'
	},
	userOrder: {
		add: 'insert into userOrder(uid, oaddress, phone, state, time) values (?, ?, ?, ?, ?)',
		searchUid: 'select * from userOrder where uid = ? order by oid desc',
		updateState: 'update userOrder set state = ? where oid = ?',
		id: 'SELECT @@IDENTITY as id',
		selectAll:'select * from userOrder',
		selectOrder: 'select * from userOrder where oid = ? or uid = ?',
	},
	orderDetails: {
		selectAll:'select * from orderDetails',
		add: 'insert into orderDetails(oid,pid,opimg,pname,opnum,oprice,total) values (?, ?, ?, ?, ?, ?, ?)',
		searchOid: 'select * from orderDetails where oid = ?',
		searchOrder: 'select * from orderDetails join userOrder where orderDetails.oid = userOrder.oid and userOrder.uid=?'
	},
	//评价表
	evaluate: {
		add: 'insert into evaluate(pid,uid,img,evaluation,time) values (?, ?, ?, ?, ?)',
		searchPid: 'select * from evaluate where pid = ?',
	}
}

module.exports = sqlMap;
