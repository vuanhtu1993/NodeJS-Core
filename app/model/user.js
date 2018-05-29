// get instance of mongoose
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import md5 from 'md5';
import jwt from 'jsonwebtoken';

// Create User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  token: String,
  username: String,
  password: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  bio: String,
  image: String,
}, {timestamps: true});

UserSchema.methods.setPassword = function(plainPW) {
  return this.password = md5(plainPW);
};
export const generateToken = (payload, secret) => {
  return jwt.sign(payload, secret, {expiresIn: 1440});
};

// Set up mongoose model after all built methods
const User = mongoose.model('User', UserSchema);

export default User;