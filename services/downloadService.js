const path = require('path')
const downloadApprovedAssign = (req, res, next) => {
    const file = path.resolve('outputs') + '/' + req.params.filename
    res.status(200).download(file)
}

module.exports = downloadApprovedAssign