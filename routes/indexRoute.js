const express=require('express');
const router=express.Router();
const {isAuthorised,isLoggedin}=require('../middleware/isLoggedin')
const productModel=require('../models/product-model')
const userModel=require('../models/user-model')
router.get('/',(req,res)=>{
    res.render('index',{})
})

router.get('/shop',isLoggedin(), async(req,res)=>{
    let products=await productModel.find({});

    res.render('shop',{products,user:req.user});
})

router.get('/cart',isLoggedin(), async(req,res)=>{
    let user=await userModel.findOne({_id:req.user.userId}).populate("cart");

    res.render('cart',{products:user.cart,user:req.user});
})
router.get('/addtocart/:productid',isLoggedin(), async(req,res)=>{
    const user=await userModel.findOne({_id:req.user.userId});
    user.cart.push(req.params.productid);
    await user.save();
    const products=await productModel.find()
    res.render('shop',{user:req.user,success:"Added to cart",products});
})




module.exports=router;