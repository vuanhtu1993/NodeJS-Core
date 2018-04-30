import express from 'express';
import {createUser, logIn} from "../controller/user";
import config from "../config";

// Create router instance
const router = express.Router();

// Route middleware to verify a token
router.use((req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return res.json({
					success: false,
					message: 'Failure to authenticate token !'
				})
			} else {
				req.decoded = decoded;
				next();
			}
		})
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided !',
		})
	}
});

// API user
router.post('/register', createUser);
router.post('/login', logIn);

export default router;