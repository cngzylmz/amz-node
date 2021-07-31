const sgMail = require('@sendgrid/mail')
const fs = require("fs");

sgMail.setApiKey(process.env.SENDGRID_APP_KEY );


module.exports = {
    sendApprovedMail,
    sendNoAssignMail
}


function sendApprovedMail(emailTo, pathToAttachment, fileName) {
    let attachment = fs.readFileSync(pathToAttachment + '/outputs/' + fileName).toString("base64");
    const msgWithAttach = {
        to: emailTo,
        from: 'cngzylmz@live.com',
        subject: 'AMZ Assign Check Test',
        text: 'Test',
        html: '<strong> test </strong>',
        attachments: [
            {
                content: attachment,
                filename: fileName,
                type: "approvedAssigns/txt",
                disposition: "attachment"
            }
        ]
    };
    sgMail
        .send(msgWithAttach ? msgWithAttach : attachment)
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
    };
    sgMail
        .send(msg)
        .then(() => {

        })
        .catch((error) => {
            console.error(error)
        })
}