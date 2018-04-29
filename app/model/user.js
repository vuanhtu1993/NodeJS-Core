// get instance of mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const User = new Schema({
	email: String,
	token: String,
	username: String,
	bio: String,
	image: String
});

// Set up mongoose model
const userTable = mongoose.model('User', User);

module.exports = {
	userTable,
};