import jwt from 'jsonwebtoken';
import config from '../config';

export const checkToken = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				console.log(err);
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
};