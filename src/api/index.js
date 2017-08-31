import jwt from 'jsonwebtoken'
import { Router } from 'express';
import user from './user';
import { generateToken } from '../lib/util'
import config from '../config';

export default ({db}) => {
	let api = Router();
  // Verify token, except /authenticate
  api.use(function(req, res, next) {
		const path = req.path
		if(path === '/user/authenticate' || path === '/user/reset-password' || path == '/user/forgot-password' || path.indexOf('applications') > -1){
			next()
			return
		}
    // check header or url parameters or post parameters for token
    let token = req.headers['authentication'] || req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          // If token is not valid or expired, chekc if user request goes with a refreshtoken:
          res.json({ Status: false, StatusCode: 'TOKEN_FAIL', Message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
            // FIXME: WAIT UP, at this point, token is valid, consider regenerating new token and passback to frontend
          res.NEW_TOKEN = generateToken({email:decoded.email, role:decoded.status, tokenLifeSpan: decoded.tokenLifeSpan})
          req.__USER__ = decoded; // decoded is the object we used to create jwt in /authenticate
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      res.status(403).send({
        Status: false,
        Message: 'No token provided.'
      });
    }
  });

	// mount the APIs
	api.use('/user', user({db}));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version: 1 });
	});


	return api;
}
