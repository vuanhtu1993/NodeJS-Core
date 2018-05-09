import * as md5 from "md5";
import * as mongoose from "mongoose";
import * as  uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, "is invalid"],
        index: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, "is invalid"],
        index: true,
    },
    password: String,
    bio: String,
    image: String,
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: "Article"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    hash: String,
    salt: String,
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: "is already taken!"});

// User feature
UserSchema.methods.setPassword = function(pwd: string) {
    return md5(pwd);
};
// Kết nối với bảng User trong DB
mongoose.model("User", UserSchema);
// Export Schema User for controller
const User = mongoose.model("User");
export default User;
