// get instance of mongoose
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
import md5 from 'md5';
import config from "../config";
import jwt from 'jsonwebtoken';
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
	return newUser.save()
		.then((user) => ({ success: true, user }))
		.catch((err) => ({ success: false, err: err }));
};

export const _logIn = (dataUser) => {
	return User.findOne({username: dataUser.username, password: md5(dataUser.password)})
		.then((user) => {
			const payload = {
				id: user._id,
				username: user.username,
			};
			user.token = generateToken(payload, config.secret);
			return user.save();
		})
		.catch((err) => {
			if (err) {
				return {
					success: false,
					message: 'Weather username or password incorrect !',
				}
			} else {
				return {
					success: false,
					message: 'System cannot handle authentication !',
				}
			}
		})
};

export const generateToken = (payload, secret) => {
	return jwt.sign(payload, secret, {expiresIn: 1440});

};