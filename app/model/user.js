// get instance of mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');
// Create User Schema
const userTable = new Schema({
	email: String,
	token: String,
	username: String,
	password: String,
	bio: String,
	image: String
});

// Set up mongoose model
const User = mongoose.model('User', userTable);

export const _createUser = (dataUser) => {
	const newUser = new User({
		email: dataUser.email,
		username: dataUser.username,
		password: md5(dataUser.password),
	});
	return newUser.save((err, data) => {
		if (err) throw err;
		else return data;
	})
};