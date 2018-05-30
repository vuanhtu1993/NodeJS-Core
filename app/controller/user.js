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

export async function login(req, res) {
  const {email, password} = req.body.user;
  const payload = {email, password};
  try {
    let user = await User.findOne({email: email});
    if (user.password === md5(password)) {
      user.token = user.generateToken(payload, config.secret);
      let savedUser = await user.save();
      res.send({ success: true, savedUser })
    } else {
      res.send({success: false, message: 'email or password is wrong!'})
    }
  } catch (e) {
    res.send(e);
  }
}

function handleError(e) {

}

class MyError extends Error {

}