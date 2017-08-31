import validator from 'validator';
import jwt from 'jsonwebtoken'
import randToken from 'rand-token'
import { USER_ROLES } from './constants'
import config from '../config.js'
var encryptor = require('simple-encryptor')('523t23b235hku23gb-mfmfa')

/**
 * Validate before changing psw
 * @type {{oldpassword: *, newpassword: *, repassword: *}}
 */
export const validateChangePassword = ({oldpassword, newpassword, repassword}) => {
    if(!oldpassword) {
        return 'resetpassword.oldpassword.require'
    }
    if (!newpassword) {
        return 'resetpassword.newpassword.require'
    }

    if (!repassword) {
        return 'resetpassword.renewpassword.require'
    }
    if (newpassword && repassword && newpassword !== repassword) {
        return 'resetpassword.renewpassword.match'
    }
    if (newpassword === oldpassword) {
        return 'resetpassword.oldequalstonew'
    }
    return ''
}


/**
 * Validate infor when reset password
 * @param email
 * @param ResetPasswordCode
 * @param password
 * @param repassword
 */
export const validateResetPassword = ({email, ResetPasswordCode, password, repassword}) => {

}
/**
 * Validate user info when register
 * @param info
 * @returns {*}
 */
export const validateUserInfo = (info) => {
    if(!info) {
        return 'No user information found'
    }
    // Mandatory fields inputted by admin: email, password, moderator, role,  (with moderators and admins, the field
    // 'moderator' maybe null.
    const {email, password, role, moderator, repassword} = info
    if(!email) {
        return 'Email address is a must'
    }
    if(!validator.isEmail(email)) {
        return 'Email address is not valid'
    }
    if(!password){
        return 'No password found'
    }
    if(!repassword){
        return 'Password must be entered twice to confirm'
    }
    if(password !== repassword){
        return 'Passwords not match'
    }
    if(!role) {
        info.role = 1 // Default is a normal user
    }
    if(role !== USER_ROLES.USER && role !== USER_ROLES.MODERATOR && role !== USER_ROLES.ADMIN) {
		return 'Role of user is not valid'
    }
    if(role === USER_ROLES.USER && !moderator) {
        return 'A normal user must have a moderator'
	}
	return ''
}

/**
 * Generate token base on email, role and expiration time of token
 * @param email
 * @param role
 * @param tokenLifeSpan
 * @returns {*}
 */
export const generateToken = ({email, role, tokenLifeSpan}) => {
    return jwt.sign({email, status: role}, config.secret, {
        expiresIn: (tokenLifeSpan || 3) * 60
    });
}

/**
 * As the name suggests
 */
export const generateResetPasswordToken = () => {
    return randToken.generate(60);
}
/**
 * Get password hash
 * @param str
 * @returns {*}
 */
export const generatePassHash = (str) => {
    return encryptor.encrypt(str)
}

export const decryptHash = hash => {
    return encryptor.decrypt(hash)
}