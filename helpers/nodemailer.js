const nodemailer = require('nodemailer')

const sendCustomEmail= (emailTo, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: '465',
    auth: {
      user: "kemalyusuke7878@gmail.com",
      pass: "011011jcf",
    },
    secure: true,
  });

  const message = {
    from: "no-reply@gmail.com",
    to: emailTo,
    subject,
    text
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(message)
    .then(data =>{
      resolve('Success')
    })
    .catch(err => {
      reject(err)
    })
  })
}
module.exports = sendCustomEmail