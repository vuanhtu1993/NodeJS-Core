import express from 'express';
const router = express.Router();
const mongoose = require('mongoose');
import User from '../models/User';

router.post('/api/users', (req, res, next) => {
	const { username, email, password } = req.body.user;
	let user = new User();
	user.username = username;
	user.password = user.setPassword(password);
	user.email = email;
	user.save()
		.then((user) => res.status(200).json({
			success: true,
			user: user,
		}))
		.catch((err) => res.status(400).json({
			success: false,
			error: err,
		}))
});

router.get('/api/abc', (req, res) => res.send('xxx'));
export default router;