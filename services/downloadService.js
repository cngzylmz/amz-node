const path = require('path')

module.exports = {
  downloadApprovedAssign: (req, res, next) => {
    const file = path.resolve('outputs') + '/' + req.params.filename
    res.status(200).download(file)
  },
}
