const { Schema, model } = require('mongoose')
const approvedAssignsSchema = new Schema ({
    asin: {
        type: String,
        required: [true, 'Property id is required'],
    },
    price:String,
    quantity:Number,
    amazonComPrice:Number,
    amazonComShippingPrice:Number,
    brand:String,
    category:String,
    productName:String,
    review:String,
    reviewCount:Number,
    SalesRank: Number,
    deliveryTimeInDays:Number
})

module.exports = model('approvedAssigns',approvedAssignsSchema)