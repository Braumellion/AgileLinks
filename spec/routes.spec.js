var request = require('supertest');
var app = require('../app.js');
var UserModel = require('../model/user').UserModel;

describe('Users', function() {
	
	var user = new UserModel({
		firstName: 'Jack',
		lastName: 'Black',
		email: 'jackblack@example.com',
		password: 'spiderman'
	});

	user.save(function(err) {
		if (err) throw err;
	});


	it('GET /users/', function(done) {
		request(app)
			.get('/users/')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('GET /users/?max=-1 - should receive an 400 error', function(done) {
		request(app)
			.get('/users/?max=-1')
			.expect(400, done);
	});

	it('GET /users/?max=1 - should receive 200 status and array with one element', function(done) {
		request(app)
			.get('/users/?max=1')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err) done(err);
				expect(res.body.length).toBe(1);
				done();
			});
	});

	it('POST /users/ - should receive 200 status', function(done) {
		request(app)
			.post('/users/')
			.send({
				firstName: 'Jack',
				lastName: 'Black',
				email: 'jackblack@example.com',
				password: 'spiderman'
			})
			.expect(200, done);
	});

	UserModel.remove({}, function(err) { 
   		console.log('collection removed') 
	});	

});
