
import {_createUser, _logIn} from "../model/user";
import jwt from 'jsonwebtoken';
import config from "../config";

export const createUser = (req, res) => {
	const {dataUser} = req.body;
	const data = _createUser(dataUser);
	data
		.then((data) => res.send(data))
		.catch((err) => res.send(err))
};

export const logIn = (req, res) => {
	const { dataUser } = req.body;
	let data = _logIn(dataUser);
	data
		.then((user) => {
			const payload = {
				id: user._id,
				username: user.username,
			};
			let token = jwt.sign(payload, config.secret, {expiresIn: 1440});
			res.json({
				success: true,
				token: token,
				message: `Welcome ${user.username} to medium web service !`
			})
		})
		.catch((err) => res.send({
			success: false,
			err: err,
			message: 'Username or password incorrect !'
		}));
};