import winston from './winston';
import nodemailer from 'nodemailer';
import fs from 'fs';
import EmailTemplate from 'email-templates';
import path from 'path';
import nodemailerSendgrid from 'nodemailer-sendgrid';

let transporter = nodemailer.createTransport(nodemailerSendgrid({
    apiKey: config.mailer.SENDGRID_API_KEY
}));

const sendEmail = (receiverEmail, subject, templateData, template, directory, cb) => {
    let rootPath = path.normalize(`${__dirname}/..`);
    winston.info(' Receiver Email => %s', receiverEmail);

    const templateDir = path.join(rootPath, 'app', 'modules', directory, 'templates', 'email', template);

    fs.lstat(templateDir, (err, stats) => {
        if (err || !stats.isDirectory()) {
            winston.error(err);
            return cb(err);
        }

        const email = new EmailTemplate({
            message: { from: `${config.mailer.mailerName} < ${config.mailer.fromAddress} >` },
            send: (global.config.env === 'development') ? true : true,
            views: { options: { extension: 'ejs' } },
            preview: false,
            transport: transporter
        });

        let receivers = '';
        if (templateData.name)
            receivers = `${templateData.name} <${receiverEmail}>`;
        else
            receivers = `<${receiverEmail}>`;

        email.send({
                template: templateDir,
                message: { to: receivers },
                locals: templateData
            })
            .then(([response]) => {
                winston.info('Email has been delivered with code %s %s to %s', response.statusCode, response.statusMessage, receivers);
                return cb();
            })
            .catch(winston.error);
    });

};

export {transporter};
export {sendEmail};