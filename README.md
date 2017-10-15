# node-blog#

**功能分析：**具有注册、登录、发表文章及登出功能

**设计目标：**

未登录时： 主页左侧显示 home、login、register，右侧显示已发表的文章、日期及作者

登录后： 主页左侧显示 home、post、logout，右侧显示已发表的文章、日期及作则

用户登录、注册、发表成功、登出后返回主页

### 创建项目 ###

	express e blog
	cd blog && npm i

安装完成后运行
	
	node ./bin/www

在浏览器中打开http://localhost:3000

目录结构如下：
	
	blog
	  |- app.js
	  |- bin
	  |- node-modules
	  |- package.json
	  |- publilc
	  |- routes
	  |- views


### 路由规则 ###

修改 routes/index.js 代码如下
	
	var express = require('express');
	var router = express.Router();
	
	router.get('/', function(req, res) {
	  res.render('index', { title: '主页' });
	});
	
	router.get('/reg', function(req, res) {
		res.render('reg', { title: '注册' });
	})
	
	router.post('/reg', function(req, res) {
	})
	
	router.get('/login', function(req, res) {
		res.render('login', { title: '登录' });
	})
	
	router.post('/login', function(req, res) {
	})
	
	router.get('/post', function(req, res) {
		res.render('post', { title: '发表' });
	})
	
	router.post('/post', function(req, res) {
	})
	
	router.get('/logout', function(req, res) {
	})
	module.exports = router;

### 数据库 ###

1.在根目录下创建 settings.js 文件，用于存放数据库配置信息，代码如下：

	


2.在根目录下创建 models/db.js, 创建连接实例，代码如下：

	var settings = require('./settings'),
		Db = require('mongodb').Db,
		Connection = require('mongodb').Connection,
		Server = require('mongodb').Server;
	
	module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});

3.在 app.js 添加如下代码

	var settings = require('/settings');

4.安装中间件

	npm i express-session connect-mongo --s

###项目启动###
	
	npm i
	npm run start

###未完，待续###

已实现登录，注册，登出
	
	