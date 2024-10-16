const bcrypt=require('bcrypt')
const userModel=require('../models/user-model')
const jwt=require('jsonwebtoken');
const { isLoggedin } = require('../middleware/isLoggedin');
const productModel = require('../models/product-model');

function createAccount(){
return async (req,res)=>{
    const {fullname,email,password}=req.body;
    if(!fullname||!email||!password){
       return res.render('index',{error:"Some fields are missing"});
    }

    const existingUser=await userModel.findOne({email});
    if(existingUser){
        return res.render('index',{error:"User already exists"});
    }else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                // Store hash in your password DB.
                const user=await userModel.create({
                    fullname,email,password:hash,
                })
                return res.redirect('/');
            });
        });
       
    }
    
}
}

function userLogin(){
    return async(req,res)=>{
       const {email,password}=req.body;
       if(!email||!password){
        return res.render('index',{error:"Some fields are missing"});
     }
     const checkexistingUser=await userModel.findOne({email});
     const products=await productModel.find();
     if(!checkexistingUser){
        return res.render('index',{error:"Invalid email or paasword",})
     }else{
        try {
            bcrypt.compare(password, checkexistingUser.password, function(err, result) {
                if(result){
                    var token = jwt.sign({fullname:checkexistingUser.fullname,userId:checkexistingUser._id,admin:checkexistingUser.isadmin}, 'vivekgupta');
                    res.cookie("token",token);
                    return res.redirect('/shop');
                }else{
                    return res.render('index',{error:"Invalid Email or password"});
                }
            });
        } catch (err) {
        }
     } 
    }
}

function logout(){
    return (req,res)=>{
        res.clearCookie('token');
        res.redirect('/');
    }
}

module.exports={createAccount,userLogin,logout};