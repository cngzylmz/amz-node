const express = require('express')
const router = express.Router()
const checkAssign = require('../pageControl/assignCheck')
const {downloadApprovedAssign} = require('../services/downloadService')
const {
    getAllProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct,
} = require('../services/productService')
// const Axios = require("axios");
// const https = require("https");
// const adb  = require('../adb.json')
router
    .post('/assigns', checkAssign)
    .get('/download/:filename', downloadApprovedAssign)
    // .get('/adb', () => {
    //     const httpsAgent = new https.Agent({rejectUnauthorized: false});
    //
    //     const config = {
    //         headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOjE2OTU5LCJyb2xlIjo1LCJuYmYiOjE2MzI0MjMxNDcsImV4cCI6MTYzMjQ2NjM0NywiaWF0IjoxNjMyNDIzMTQ3LCJpc3MiOiJodHRwczovL2FkYnMudWFiLmdvdi50ciIsImF1ZCI6Imh0dHBzOi8vYWRicy51YWIuZ292LnRyIn0.RXb5emlpp_-70PfwvWCtJRAzbOBTHnaMzdCLNlVXGxQ`},
    //         httpsAgent
    //     };
    //
    //
    //     adb.forEach( (data) => {
    //         data.lectures.forEach(item => {
    //         if(!item.completed) {
    //             console.log(item.id)
    //         const bodyParameters = {
    //             "educationId": 1,
    //             "lectureId": item.id,
    //             "complete": true
    //         };
    //         Axios.post(
    //             'https://adbs.uab.gov.tr/api/educations/complete',
    //             bodyParameters,
    //             config
    //         ).then((res, req, next) => {
    //             console.log(res.data.success)
    //         }).catch(err => {
    //             console.log(err.message)
    //         });
    //         }
    //         })
    //     })
    //
    //
    // })


// .post('/dbtest', (req, res, next) => {
//     let data = req.body
//     /*const approvedAssigns = new ApprovedAssigns({...data})
//     approvedAssigns
//         .save()*/
//     ApprovedAssigns.findByIdAndUpdate({_id: "60ff0a307d599d035c89bba5"}, {...data})
//         .then((r) => {
//             console.log('product saved', r)
//             console.log(r)
//             res.send(r)
//         })
//         .catch((err) => {
//             console.log(err)
//             if (err.name === 'ValidationError') {
//                 //   console.error('Error Validating!', err)
//                 res.status(422)
//             } else {
//                 console.error(err)
//                 res.status(500)
//             }
//         })
// })

module.exports = router
