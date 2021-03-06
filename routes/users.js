var express = require('express');
var router = express.Router();
var UserModel = require('../model/user').UserModel;


router.route('/')

	.get(function(req, res) {
		var skip = parseInt(req.query.skip) || 0; 
		var max = parseInt(req.query.max) || 1;

		if (max <= 0) {
			res.status(400).end();
		} else {
			UserModel.find({}).limit(max).skip(skip).exec(function (err, users) {
	    		if (err) {
	    			console.log(err);
	    			res.status(500).end();
	    		} else {
	    			res.json(users)
	    		}
	  		});
		}
	})

	.post(function(req, res) {
		var user = new UserModel({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password
		});

		user.save(function(err) {
			if (err) {
				console.log(err);
				res.status(400).end();
			}

			res.status(200).end();
		});

	});

router.get('/total', function(req, res) {
	
	UserModel.count({}, function(err, count){
		res.json({count: count});
	});

});


router.route('/:id')


	.get(function(req, res) {
		var id = req.params.id;

		UserModel.findOne({ _id: id }, function(err, user) {
			if (err) {
				res.status(404).end();
			}

			res.json(user);
		});

	});

module.exports = router;
