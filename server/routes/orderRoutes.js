const express = require('express');
const route = express.Router();
const Order = require('../models/Order');
const authenticateToken = require('../middleware/authMiddleware');

route.get('/Orders', authenticateToken, async(req, res) => {
    const Orders = await Order.find({user: req.user.id}).sort({placedAt: -1}).populate('user');
    return res.status(201).json(Orders)
} )

route.post('/Orders', authenticateToken, async (req, res) =>{
    const {userModel,country,currency, items, total, DeliveryAddress, PinCode, placedAt} = req.body;
    if(!items || items.length === 0){
     return res.status(400).send({message: 'No ordered Items get!'})
    }
    try{
   const newOrder = await Order.create({
        user: req.user.id,
        userModel,
        country,
        currency,
        items,
        total, 
        DeliveryAddress, 
        PinCode, 
        placedAt
    })
console.log(newOrder)
    res.status(201).send({message: 'orders saved successfully!'});
} catch(err){
    console.error(err)
    return res.status(500).send({message: 'Error while saving your Orders', err});
}
})

module.exports = route;