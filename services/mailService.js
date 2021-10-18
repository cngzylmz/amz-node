const sgMail = require('@sendgrid/mail')
const fs = require('fs')

sgMail.setApiKey(process.env.SENDGRID_APP_KEY)

module.exports = {
  sendApprovedMail,
  sendNoAssignMail,
  sendBackAssignMail,
}

function sendApprovedMail(emailTo, fileName) {
  const msgApproved = {
    to: emailTo,
    from: 'cngzylmz@live.com',
    subject: 'AMZ Assign Check Test',
    text: 'Test',
    html: `<strong> http://localhost:3000/download/${fileName} </strong>`,
  }
  sgMail
    .send(msgApproved)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

function sendNoAssignMail(emailTo) {
  const msg = {
    to: emailTo,
    from: 'cngzylmz@live.com',
    subject: 'AMZ No Approved Assign Check Test',
    text: 'Test',
    html: '<strong> test </strong>',
  }
  sgMail
    .send(msg)
    .then(() => {})
    .catch((error) => {
      console.error(error)
    })
}
function sendBackAssignMail(emailTo) {
  const msg = {
    to: emailTo,
    from: 'cngzylmz@live.com',
    subject: 'AMZ No Approved Assign Check Test',
    text: 'Test',
    html: '<strong> test </strong>',
  }
  sgMail
    .send(msg)
    .then(() => {})
    .catch((error) => {
      console.error(error)
    })
}
