// get instance of mongoose
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import md5 from 'md5';
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
	return newUser.save();
};

export const _signIn = (dataUser) => {
	return User.findOne({username: dataUser.username, password: md5(dataUser.password)});
};