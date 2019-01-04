let nodemailer = require('nodemailer');

/*  USE your GMAIL Login and go to
    https://myaccount.google.com/lesssecureapps
    and allow less secure apps
*/

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pmskillshouse@gmail.com',
   	pass: 'pmskillshOuse@123'
  }
});

module.exports = transporter;
