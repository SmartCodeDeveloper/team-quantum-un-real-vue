import winston from "../../../../../config/winston"
import nodemailer from 'nodemailer'

const transporter  = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'team_quantum@outlook.com',
        pass: 'quantum@team10'
    }
});
     

export const sendMail = async (userMail, otp) => {
    const options = {
        from: "team_quantum@outlook.com",
        to: userMail,
        subject: "Welcome to the unreal world",
        text: `Verify with otp ${otp}`
    }
    

    transporter.sendMail(options,function(err, info){
        if (err){
            winston.error(err)
            return
        }
        winston.info("Mail sent successfully")
    })

}



