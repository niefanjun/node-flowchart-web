const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
const hotMiddleWare = require('./lib/hotmiddleware');
const mockApi = require('./lib/mockApi');
if (process.env.NODE_ENV == 'dev') {
	//app.use('/dist', express.static(__dirname + '/demo/dist'));
	hotMiddleWare(app);
	mockApi(app);
}

if (process.env.NODE_ENV == 'prod') {
	app.engine('html',ejs.__express);
	app.set('views',path.join(__dirname,'/demo'));
	app.set('view engine','html');

	app.use('/', express.static(__dirname + '/demo'));

	app.use('/index',function(req,res){
		res.render('index',{});
	})
}

// 错误处理
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: err.stack||err
	})
})

module.exports = app;