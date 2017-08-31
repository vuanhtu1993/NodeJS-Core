var nodemailer = require('nodemailer');
import config from '../config';
// Create the transporter with the required configuration for Outlook
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: config.email_config.smtp_server, // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: config.email_config.smtp_port, // port for secure SMTP
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: config.email_config.smtp_usernae,
        pass: config.email_config.smtp_pass,
    }
});
/**
 * Send reset password link
 */
const sendResetPassword = (payload, callback) => {
    // setup e-mail data, even with unicode symbols
    var mailOptions = {
        from: config.email_config.FROM, // sender address (who sends)
        to: payload.TO, // list of receivers (who receives)
        subject: '[Fattoria] - Reset password', // Subject line
        html: `<div>Please follow this link to reset your password. <br/>
        http://localhost/reset_password/?code=${payload.code}&email=${payload.TO}
</div>
<div>
    If you did not request new password, please ignore this email.<br/> Best Regards, <br/>Fattoria Team
</div>
` // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, callback);
}
/**
 * Send welcome email to new users
 */
const sendWelcomeLink = () => {
    // TODO
}

export {
    sendResetPassword, sendWelcomeLink
}