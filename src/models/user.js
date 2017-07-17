// Represents normal users and moderators, administrators
var mongoose = require('mongoose')
let Schema = mongoose.Schema
export default mongoose.model('User', new Schema({
  fullname: String,
  password: String,
  email: String,
  birthday: { type: Date, default: Date.now },
  role: { type: Number, min: 1, max: 3 }, // 1 = Normal User, 2 = Moderator, 3 = Admin
  profilePicture: String,
  active: { type: Boolean, default: true },
  tokenLifeSpan: { type: Number, default: 3 },
}))