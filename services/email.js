const nodemailer = require("nodemailer");



const sendemail = async (req) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.senderEmail,
                pass: process.env.emailPass,
            },
        });
        let mailOption = {
            from: process.env.senderEmail, // sender address
            to: req.email, // list of receivers
            subject: "OTP", // Subject line
            text: req.code, // plain text body
        }
        let mail = await transporter.sendMail(mailOption);
        return mail
    } catch (err) {
        return err;
    }
}

module.exports = {
    sendemail
}