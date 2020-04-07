// node 后端服务器  定义与监听后端服务器
const userApi = require('./api/userApi');
const shopCarApi = require('./api/shopCarApi');
const menuApi = require('./api/menuApi');
const productApi = require('./api/productApi');
//const addressApi = require('./api/addressApi');
const materialApi = require('./api/materialApi');
const stepApi = require('./api/stepApi');
const userOrderApi = require('./api/userOrderApi');
const orderDetailApi = require('./api/orderDetailApi');
const mangerApi = require('./api/mangerApi');
const evaluateApi = require('./api/evaluateApi');

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/shopCar', shopCarApi);
app.use('/api/menu', menuApi);
app.use('/api/product', productApi);
//app.use('/api/address', addressApi);
app.use('/api/material', materialApi);
app.use('/api/step', stepApi);
app.use('/api/userOrder', userOrderApi);
app.use('/api/orderDetail', orderDetailApi);
app.use('/api/manger', mangerApi);
app.use('/api/evaluate', evaluateApi);

app.use('/uploads', express.static(__dirname + '/uploads'))
const multer = require('multer')
const upload = multer({dest: __dirname + '/../../uploads'})
app.post('/api/admin/upload',upload.single('file'), async (req, res) => {
  	const file = req.file
  	file.url = `http://localhost:3000/uploads/${file.filename}`
  	res.send(file)
})

// 监听端口
app.listen(3000);

console.log('success listen at port:3000......');