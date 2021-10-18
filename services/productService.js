const ApprovedAssigns = require('../db/schemas/approvedAssignsSchema')

const getAllProducts = async (req, res, next) => {
  const product = await ApprovedAssigns.find({})
  res.status(200).json(product)
}
const getProduct = async (req, res, next) => {
  const product = await ApprovedAssigns.findOne({})
  res.status(200).json(product)
}

const saveProduct = (req, res, next) => {
  const approvedAssigns = new ApprovedAssigns(req.body)
  approvedAssigns
    .save()
    .then((data) => {
      console.log('product saved', data)
      res.status(200).json(data)
    })
    .catch((err) => {
      console.log(err)
      if (err.name === 'ValidationError') {
        res.status(422)
      } else {
        console.error(err)
        res.status(500)
      }
    })
}

const updateProduct = (req, res, next) => {
  ApprovedAssigns.findByIdAndUpdate({ _id: req.params.id }, { ...req.data })
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err)
        res.status(422).json(err)
      } else {
        console.error(err)
        res.status(500).json(err)
      }
    })
}

const deleteProduct = (req, res, next) => {
  ApprovedAssigns.findByIdAndDelete(req.params.id).then((data) => {
    res.status(200).json(data)
  })
}

module.exports = {
  getAllProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
}
