
var mongoose = require('mongoose');


var UserSchema = mongoose.Schema({
	firstName: {
		type: String, 
		required: true, 
		trim: true,
		max: 80
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
	created_at: {
		type: Date
	},
	updated_at: { 
		type: Date
	},
	deleted: {
		type: Boolean,
		default: false
	},
	role: {
		type: String,
		trim: true,
		default: 'normal' // normal, admin
	}
});

UserSchema.methods.isDeleted = function() {
	return this.deleted;
};

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;

  if ( !this.created_at ) {
    this.created_at = now;
  }

  next();
});

var UserModel = mongoose.model('User', UserSchema);

exports.UserModel = UserModel;