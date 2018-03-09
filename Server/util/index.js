import nodemailer from 'nodemailer';
import config from '../config';

const { emailConfig } = config;
let mailTransport = null;

export const getParams = (ctx) => {
  return ctx.request.body;
};


export const sendEmail = async ({ code, email }) => {
  // if (!mailTransport) {
  mailTransport = nodemailer.createTransport({
    host: emailConfig.stmpServer,
    secure: false,
    port: emailConfig.port,
    auth: {
      user: emailConfig.username,
      pass: emailConfig.auth,
    },
  });
  // }
  var options = {
    from: `${emailConfig.username}@163.com`,
    to: email,
    subject: 'one-time-password',
    text: code,
    html: `<h1>${code}</h1>`,
  };

  return mailTransport.sendMail(options);
}