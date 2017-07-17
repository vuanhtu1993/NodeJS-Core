import jwt from 'jsonwebtoken'
import { Router } from 'express';
import user from './user';
import config from '../config';

export default () => {
	let api = Router();
  // Verify token, except /authenticate
  api.use(function(req, res, next) {
		const path = req.path
		if(path === '/user/authenticate'){
			next()
			return
		}
    // check header or url parameters or post parameters for token
    var token = req.headers['authentication'] || req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          return res.json({ Status: false, Message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded; // decoded is the object we used to create jwt in /authenticate
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
        Status: false,
        Message: 'No token provided.'
      });
    }
  });

	// mount the facets resource
	api.use('/user', user());

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ v: 1 });
	});


	return api;
}
