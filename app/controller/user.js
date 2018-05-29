import mongoose from 'mongoose';
import User from '../model/user';
export function registerUser(req, res) {
  const { email, username, password } = req.body.userData;
  const user = new User({ email, username });
  console.log(user);
  user.password = user.setPassword(password);
  user.save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
}