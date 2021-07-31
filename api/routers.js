const express = require("express");
const router = express.Router()
const checkAssign = require('../pageControl/assignCheck')
const downloadApprovedAssign = require('../services/downloadService')


const ApprovedAssigns = require('../db/schemas/approvedAssignsSchema')

router
    .post('/assigns', checkAssign)
    .get('/download/:filename', downloadApprovedAssign)
    .post('/dbtest', (req, res, next) => {
        let data = req.body
        /*const approvedAssigns = new ApprovedAssigns({...data})
        approvedAssigns
            .save()*/
        ApprovedAssigns.findByIdAndUpdate({_id: "60ff0a307d599d035c89bba5"}, {...data})
            .then((r) => {
                console.log('product saved', r)
                console.log(r)
                res.send(r)
            })
            .catch((err) => {
                console.log(err)
                if (err.name === 'ValidationError') {
                    //   console.error('Error Validating!', err)
                    res.status(422)
                } else {
                    console.error(err)
                    res.status(500)
                }
            })
    })

module.exports = router