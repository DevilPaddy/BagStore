const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', (req,res)=>{
    let error = req.flash("error");
    res.render('index',{error});
});

router.get('/shop',isLoggedin, async (req,res)=>{
    let products = await productModel.find()
    res.render('shop',{products});
});

router.get('/addcart/:id', isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    console.log(user);
    
    // Use the correct parameter (req.params.id)
    user.cart.push(req.params.id); // This should be req.params.id, not req.params.productid
    
    await user.save();
    
    // You might want to send a response or redirect after adding the product to the cart
    res.redirect('/shop'); // Redirecting back to the shop page after adding the product
});

router.get('/cart',isLoggedin, async (req,res)=>{
    let user = await userModel
    .findOne({email: req.user.email})
    .populate("cart");
// console.log(user.cart);

    res.render('cart', {user});
});

module.exports = router;