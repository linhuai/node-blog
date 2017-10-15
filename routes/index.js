var crypto = require('crypto');
var User = require('../models/user.js');

var router = function (app) {

	app.get('/', function(req, res) {
	  res.render('index', { 
	  	title: '主页' ,
	  	user: req.session.user,
	  	success: req.flash('success').toString(),
	  	error: req.flash('error').toString()
	  });
	});

	app.get('/reg', function(req, res) {
		res.render('reg', { 
			title: '注册', 
			user: req.session.user,
			success: req.flash('success').toString(), 
			error: req.flash('error').toString() 
		});
	})

	app.post('/reg', function(req, res) {
		var name = req.body.name,
			password = req.body.password,
			password_pe = req.body['password-repeat'],
			email = req.body.email;

		//检测用户两次输入的密码是否一致
		if (password_pe != password) {
			req.flash('error', '两次输入的密码不一致');
			return res.redirect('/reg');
		}
		//生成密码的 md5 值
		var md5 = crypto.createHash('md5'),
			password = md5.update(password).digest('hex');
		var newUser = new User({
			name: name,
			password: password,
			email: email
		})

		//检查用户名是否已经存在
		User.get(newUser.name, function (err, user) {
			if(err){
				req.flash('error', err);
				return res.redirect('/');
			}
			if(user){
				req.flash('error', '用户已存在');
				return res.redirect('/reg');
			}
			//如果不存在，新增加用户
			newUser.save(function (err, user) {
				if(err) {
					req.flash('error', err);
					return res.redirect('/reg');
				}
				req.session.user = user; //用户信息写入session
				req.flash('success', '注册成功');
				res.redirect('/');
			});
		});
	});

	app.get('/login', function(req, res) {
		res.render('login', { 
			title: '登录',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	})

	app.post('/login', function(req, res) {
		//生成密码 md5 值
		var name = req.body.name,
			password = req.body.password;

		var md5 = crypto.createHash('md5'),
			password = md5.update(password).digest('hex');
			console.log(password);
		//检查用户是否存在
		User.get(name, function(err, user) {
			if (!user) {
				req.flash('error', '用户名不存在');
				return res.redirect('/login');
			}

			//检查密码是否一致
			if (user.password != password) {
				req.flash('error', '密码错误');
				return res.redirect('/login');
			}

			//用户名密码一致，写入session
			req.session.user = user;

			req.flash('success', '登录成功');
			res.redirect('/');
		});
	});

	app.get('/post', function(req, res) {
		res.render('post', { title: '发表' });
	})

	app.post('/post', function(req, res) {
	})

	app.get('/logout', function(req, res) {
		req.session.user = null;
		req.flash('success', '登出成功');
		res.redirect('/');
	})

}
module.exports = router;
