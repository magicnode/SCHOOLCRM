import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import wellknown from 'nodemailer-wellknown'

function sendEmail() {

  const config = wellknown("QQ")
  config.auth = {
    user: '',
    pass: '',
  }

  const transporter = nodemailer.createTransport(smtpTransport(config))

  const mailOptions = {
    from: '',
    to: '',
    subject: '妈的又出Bug了，赶紧去调。',
    text: '',
    html: mes,
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Message sent: ' + info.response)
    }
  })

}

export default sendEmail
