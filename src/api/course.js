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

    router.post('/featured-courses', (req, res) => {
        db.collection('courses').find({
          featured: true
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
