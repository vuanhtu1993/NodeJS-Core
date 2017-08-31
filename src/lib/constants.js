 const USER_ROLES = {
    ADMIN: 3,
    MODERATOR: 2,
    USER: 1,
}

 const RESPONSE_CODES = {
    ERROR_HAPPENED: 'E100',
    AUTHENTICATION : {
        INVALID_U_P : 'AU100',
        NO_ROLE: 'AU101'
    },
    USER: {
        REGISTER_FAIL: 'U100',
        REGISTER_FAIL_DB: 'U101',
        REGISTER_FAIL_EMAIL_DUPLICATE: 'U102',
    }
}
const LANGUAGE_CODES = ['en', 'de']

export {
    USER_ROLES, RESPONSE_CODES, LANGUAGE_CODES
}