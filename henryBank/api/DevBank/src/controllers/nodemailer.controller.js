const nodemailer = require('nodemailer');

module.exports = {
    async sendEmail(data){

        let transporter = nodemailer.createTransport({
            service: "Gmail",
            port: 587,
            secure: false,
            auth: {
                user: 'devbank2021@gmail.com',
                pass: 'DevBank2021*',
            },
            tls: {rejectUnauthorized: false}
        })

        return transporter.sendMail(data, (err, info) => {
            if(!err) {
                return ({msg: 'Email was sent'})
            }else{
                return ({msg: 'Email is invalid'})
            }
        })
    }
}