import {Router} from 'express'
const fs = require('fs.extra')
var multer  = require('multer')
var upload = multer({
    dest: '/Users/khuongdv/Development/Thomas/Fattoria-Backend/src/UploadedFile/'
})
import moment from 'moment'
import {USER_ROLES} from '../lib/constants'
import {RESPONSE_CODES,LANGUAGE_CODES} from '../lib/constants'
import {sendResetPassword} from '../lib/mailer'
import {validateUserInfo, generateToken, generateResetPasswordToken,
    generatePassHash, decryptHash,
    validateResetPassword, validateChangePassword} from '../lib/util'
export default ({db}) => {
    const router = Router()
// middleware that is specific to this router
    router.use((req, res, next) => {
        next()
    })

// Authenticate user
    router.post('/authenticate', (req, res) => {
        // TODO: validate email, makesure it has valid value
        const {email, password, role} = req.body
        // generatePassHash('123456') //- e9c4963bc81007eec195ae9521b91633fb81e3bc844e99f10e864f85b7bb7451fa8b5f0f1df8ffbb125e4ce63334b6f02Avbjdpkt/HXUvSnb+85Vg==
        db.collection('users').findOne({
            email, role
        }).then((user) => {
            if (!user) {
                res.json({
                    Status: false,
                    StatusCode: RESPONSE_CODES.AUTHENTICATION.INVALID_U_P,
                    Message: 'Authentication failed. User email or password is not valid.'
                });
            } else {
                // check if password matches
                if (req.body.password !== decryptHash(user.password)) {
                    res.json({
                        Status: false,
                        StatusCode: RESPONSE_CODES.AUTHENTICATION.INVALID_U_P,
                        Message: 'Authentication failed. User email or password is not valid.'
                    });
                } else {
                    // if user is found and password is right
                    // create a token
                    let token = generateToken({email, role: user.role, tokenLifeSpan: user.tokenLifeSpan})
                    res.json({
                        Status: true,
                        Token: token,
                        LanguageCode: user.LanguageCode,
                    });
                }
            }
        }).catch(e => {
            res.json({
                Status: false,
                Message: 'System error in /authenticate',
            });
        })
    })
  /**
   * Get list fresher, only for ADMIN role
   */
  router.post('/list-fresher', function (req, res) {
        const {status} = req.__USER__
        const role = status // Status actually is role, when add to jwt I changed role to status

        if (role !== USER_ROLES.ADMIN) {
          res.json({
            Status: false,
            NewToken: res.NEW_TOKEN,
            StatusCode: RESPONSE_CODES.AUTHENTICATION.NO_ROLE,
            Message: 'You are not allowed to access this resource'
          })
          return
        }
        // Is administrator
        db.collection('users').find({
          active: true,
          role: USER_ROLES.FRESHER
        },{
          email: 1, tokenLifeSpan: 1, active: 1, birthday: 1, role: 1, avatar: 1, fullName: 1,
          applicationDate: 1, dob: 1, gender: 1, university: 1, major: 1, channel: 1, note: 1, skill: 1,
          foreignLanguage: 1, entryTest: 1
        }).toArray(function (err, result) {
          let propArray = []
          var i, count;
          for (i = 0, count = result.length; i < count; i++) {
              propArray.push(result[i]);
          }
          return res.json({
              Status: true,
              NewToken: res.NEW_TOKEN,
              DatSize: propArray.length,
              FresherList: propArray,
          })
        })
    })

    router.post('/register', (req, res) => {
        // FIXME Assume that only admin could add account
        const {status} = req.__USER__
        const role = status
        if (role !== USER_ROLES.ADMIN) {
            res.json({
                Status: false,
                NewToken: res.NEW_TOKEN,
                StatusCode: RESPONSE_CODES.USER.REGISTER_FAIL,
                Message: 'You must be an administrator to create new users',
            })
            return
        }
        // Validate fields of a regular user
        const validationMessage = validateUserInfo(req.body, db)
        if (validationMessage) {
            res.json({
                Status: false,
                NewToken: res.NEW_TOKEN,
                StatusCode: RESPONSE_CODES.USER.REGISTER_FAIL,
                Message: validationMessage
            })
            return
        }
        // Check email existence
        db.collection('users').findOne({email: req.body.email}).then((data) => {
            if (!data) {
                // No data found
                // Hash the password
                const hashedPassword = generatePassHash(req.body.password);
                // Do save
                const now = moment().format();
                const objectToBeSaved = {
                    email: req.body.email,
                    password: hashedPassword,
                    role: req.body.role,
                    tokenLifeSpan: 3,
                    moderator: req.body.moderator,
                    createdDate: now,
                    modifiedDate: now,
                    active: true, // set to false to indicate that this user has been deleted
                }
                db.collection('users').insertOne(objectToBeSaved, (err, data) => {
                    if (err) {
                        res.json({
                            Status: false,
                            NewToken: res.NEW_TOKEN,
                            StatusCode: RESPONSE_CODES.USER.REGISTER_FAIL_DB,
                            Message: 'Error saving new user to database'
                        })
                        return
                    }
                    res.json({
                        Status: true,
                        NewToken: res.NEW_TOKEN,
                        Message: `Successfully added new user ${req.body.email}`
                    })
                })
            } else {
                res.json({
                    Status: false,
                    NewToken: res.NEW_TOKEN,
                    StatusCode: RESPONSE_CODES.USER.REGISTER_FAIL_EMAIL_DUPLICATE,
                    Message: 'Email does exist in the system'
                })
            }
        }).catch(e => {
            res.json({
                Status: false,
                NewToken: res.NEW_TOKEN,
                StatusCode: RESPONSE_CODES.USER.REGISTER_FAIL_DB,
                Message: 'Error saving new user to database'
            })
            return
        })
    })
    router.post('/forgot-password', (req, res) => {
        // TODO: validate if have refreshtoken
        const {email} = req.body // Email which will receive recovery password link
        // First validate its validity
        if(!email || email.length < 5 || email.indexOf('@') < 0) {
            res.json({
                Status: false,
                NewToken: res.NEW_TOKEN,
                StatusCode: 'INVALID_EMAIL',
                Message: 'Invalid Email',
            });
            return;
        }
        // Check if email exists in db
        db.collection('users').findOne({
            email
        }).then(user => {
            if (!user){
                res.json({
                    Status: false,
                    NewToken: res.NEW_TOKEN,
                    StatusCode: 'EMAIL_NOT_EXIST',
                    Message: 'No user having this email',
                });
                return
            }
            if(user){
                // Generate a random code to reset
                const ResetPasswordCode = generateResetPasswordToken();
                db.collection('users').updateOne({
                    email
                }, {
                    $set: {
                        ResetPasswordCode, ResetPasswordCodeTime: Date.now(),
                    }
                }).then(data => {
                    // Now send email to him
                    if(data) {
                        sendResetPassword({TO: email, code: ResetPasswordCode}, (err, info) => {
                            if(!err){
                                res.json({
                                    Status: true,
                                    NewToken: res.NEW_TOKEN,
                                    StatusCode: 'EMAIL_SENT',
                                    Message: 'Check mailbox to view reset link',
                                })
                            } else {
                                res.json({
                                    Status: false,
                                    NewToken: res.NEW_TOKEN,
                                    StatusCode: 'ERROR_SEND_MAIL',
                                    Message: 'Error sending email to ' + email,
                                })
                            }
                        })
                    } else {
                        res.json({
                            Status: false,
                            NewToken: res.NEW_TOKEN,
                            StatusCode: 'ERROR',
                            Message: 'Donno what happned. Try again.'
                        })
                    }

                }).catch(()=> {
                    res.json({
                        Status: false,
                        NewToken: res.NEW_TOKEN,
                        StatusCode: 'ERROR',
                        Message: 'Donno what happned. Try again.'
                    })
                })
            }
        })
    })

    router.post('/update-settings', (req, res) => {
        const {email} = req.__USER__
        let {EnableTokenExpirationTime, LanguageCode} = req.body
        if( EnableTokenExpirationTime !== true) {
            EnableTokenExpirationTime = false
        }
        if(LANGUAGE_CODES.indexOf(LanguageCode) < 0) {
            res.json({
                Status: false,
                Message: 'Language code is not valid'
            })
            return
        }
        db.collection('users').findOne({
            email
        }).then(user => {
            if(!user){
                res.json({
                    Status: false,
                    Message: 'Email address does not exist in system'
                })
                return
            }
            db.collection('users').updateOne({
                email
            },{
                $set: {
                    EnableTokenExpirationTime,
                    LanguageCode,
                    UpdateDatetime: Date.now(),
                }
            }).then(data => {
                if( !data){
                    res.json({
                        Status: false,
                        Message: 'Error happened while update settings of user'
                    })
                    return
                }
                res.json({
                    Status: true,
                    Message: 'User settings updated'
                })
            }).catch(e => {
                console.log('/update-settings', email, e.toString())
                res.json({
                    Status: false,
                    Message: 'Error finding user'
                })
            })
        }).catch(e => {
            console.log('/update-settings', email, e.toString())
            res.json({
                Status: false,
                Message: 'Unknown error happened, view server log for more information'
            })
        })
    })
    router.post('/change-password', (req, res) => {
        const {email} = req.__USER__
        const {oldpassword, newpassword, repassword} = req.body
        const preValidate = validateChangePassword({oldpassword, newpassword, repassword})
        if(preValidate){
            res.json({
                Status: false,
                Message: preValidate
            })
            return
        }
        const newHash = generatePassHash(newpassword)
        db.collection('users').findOne({
            email,
        }).then(user => {
            if (!user) {
                res.json({
                    Status: false,
                    Message: 'No User found',
                })
                return
            }
            if(decryptHash(user.password) !== oldpassword){
                res.json({
                    Status: false,
                    Message: 'Current password is not correct',
                })
                return
            }
            // Now update new pass
            db.collection('users').updateOne({
                email,
            },{$set:{
                password: newHash,
                UpdateDatetime: Date.now(),
            }}).then(() => {
                res.json({
                    Status: true,
                    Message: 'Update password successfully'
                })
                return
            }).catch( er => {
                console.log('Change password', email, er)
                res.json({
                    Status: false,
                    Message: 'Database connection error'
                })
            })
        }).catch(e=>{
            console.log('Change password', email, e)
            res.json({
                Status: false,
                Message: 'Database connection error'
            })
        })
    })

    // Change password from reset screen
    router.post('/reset-password', (req, res) => {
        const {email, ResetPasswordCode, password, repassword} = req.body;
        const validationMsg = validateResetPassword({email, ResetPasswordCode, password, repassword}) //FIXME
        if (validationMsg) {
            res.json({
                Status: false,
                NewToken: res.NEW_TOKEN,
                StatusCode: 'ERROR_VALIDATE_RESETPASS',
                Message: validationMsg
            })
            return
        }

        db.collection('users').findOne({
            email, ResetPasswordCode
        }).then(user => {
            console.log('STEP3', user)
            if(!user){
                res.json({
                    Status: false,
                    NewToken: res.NEW_TOKEN,
                    StatusCode: 'USER_NOT_FOUND_OR_WRONG_CODE',
                    Message: 'Haiz',
                })
                return
            }
            const {ResetPasswordCodeTime} = user
            console.log('STEP4', ResetPasswordCodeTime)
            if(!ResetPasswordCodeTime){
                res.json({
                    Status: false,
                    NewToken: res.NEW_TOKEN,
                    StatusCode: 'UNKNOWERROR',
                    Message: 'Haiz',
                })
                return
            }
            const current = Date.now()
            const datediff = current - ResetPasswordCodeTime
            if(datediff > 30 * 60 * 1000) {
                // If late than 30minutes, reject, require to resend reset link
                res.json({
                    Status: false,
                    NewToken: res.NEW_TOKEN,
                    StatusCode: 'RESET_CODE_EXPIRED',
                    Message: 'Reset code expired'
                })
                return
            }
            db.collection('users').updateOne({
                email
            },{$set: {
                password: generatePassHash(password),
                UpdateDatetime: Date.now(),
            }, $unset: {
               ResetPasswordCodeTime: '', ResetPasswordCode: '',
            }
            }).then(data => {
                console.log('UPDATE RESULT', data);
                res.json({
                    NewToken: res.NEW_TOKEN,
                    Status: true
                })
            }).catch(e => {
                res.json({
                    Status: false,
                    NewToken: res.NEW_TOKEN,
                    StatusCode: 'ERROR_RESET_PASS'
                })
            })
        })
    })
  /**
   * Upload avatar
   */
    router.post('/upload-avatar', (req, res) => {
        const base64code = req.body.base64Avatar
        db.collection('users').updateOne({
            email: req.__USER__.email
        },{$set: {
            avatar: base64code,
            UpdateDatetime: Date.now()
        }}).then(() => {
            res.json({
                Status: true,
                NewToken: res.NEW_TOKEN,
                Message: 'Change avatar successfully',
            })
        }).catch(e => {
            res.json({
                Status: false,
                NewToken: res.NEW_TOKEN,
                Message: 'Error saving avatar to db'
            })
        })
    });
    router.post('/user-info', (req, res) => {
        db.collection('users').findOne({
            email: req.__USER__.email,
        }).then(user=>{
            if (user) {
                res.json({
                    Status: true,
                    NewToken: res.NEW_TOKEN,
                    UserInfo: {
                        Avatar: user.avatar,
                        EnableTokenExpirationTime: user.EnableTokenExpirationTime,
                        ImageUploadable: user.ImageUploadable,
                        LanguageCode: user.LanguageCode,
                    }
                })
            }
        }).catch(e => {
            res.json({
                Status: false,
                NewToken: res.NEW_TOKEN,
                Message: 'Error getting avatar from db'
            })
        })
    })
    return router;
}
