const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      country: String,
      items: [{
        id:{
          type: Number,
          required: true
        },
        title: String,
        price: Number,
        quantity: Number,
        subtotal: Number
    }],
      total: String,
      DeliveryAddress: {
        type: String,
        required: true
      },
      PinCode: {
        type: Number,
        required: true
      },
      placedAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
      }
    }
)

module.exports = mongoose.model("Orders", OrderSchema)