import User from '../models/user';
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config.js';
export default () => {
  const router = Router()
// middleware that is specific to this router
  router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

// Authenticate user
  router.post('/authenticate', (req, res) => {
    const {email, password} = req.body
    User.findOne({
      email: req.body.email
    }, (err, user) => {
      if (err) throw err;
      if (!user) {
        console.log('Email doesnt exist', user)
        res.json({Status: false, Message: 'Authentication failed. User email or password is not valid.'});
      } else {
        // check if password matches
        if (user.password != req.body.password) {
          console.log('Password not match')
          res.json({Status: false, Message: 'Authentication failed. User email or password is not valid.'});
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign({email: user.email, tokenCreatedTime: Date.now()}, config.secret, {
            expiresIn: (user.tokenLifeSpan || 3) * 60 // expires in 24 hours
          });
          // return the information including token as JSON
          res.json({
            Status: true,
            Message: 'Enjoy your token!',
            token: token
          });
        }
      }
    })
  })
// define the about route
  router.get('/about', function (req, res) {
    res.send('About birds')
  })
  return router;
}
