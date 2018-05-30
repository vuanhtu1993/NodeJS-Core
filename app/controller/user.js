import md5 from 'md5';

import User from '../model/user';
import config from '../config'

export function registerUser(req, res) {
  const {email, username, password} = req.body.userData;
  const user = new User({email, username});
  user.password = user.setPassword(password);
  user.save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
}

export function login(req, res) {
  const {email, password} = req.body.userData;
  const payload = {email, password};
  User.findOne({email: email})
    .then((user) => {
      if (user.password === md5(password)) {
        user.token = user.generateToken(payload, config.secret);
        console.log(user);
        user.save()
          .then((user) => res.send(user))
          .catch((err) => res.send({success: false, error: err}));
      } else {
        res.send({success: false, message: 'email or password is wrong!'})
      }
    })
    .catch((err) => res.send({success: false, error: err}));
}