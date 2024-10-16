const jwt=require('jsonwebtoken');
const userModel=require('../models/user-model');
const productModel=require('../models/product-model')

function isLoggedin(){
    return async (req,res,next)=>{
       let token=req.cookies.token;
       if(!token){
        return res.render('index',{error:"Sign in first"});
       }else{
        try {
            var user = jwt.verify(token, 'vivekgupta');
          
            req.user=user;
          } catch(err) {
            // err
            return res.render('index',{error:"Something went wrong"});
          }
       }

       next();
    }
}

function isAuthorised(){
    return async(req, res, next) => {
        // Ensure the user object exists before checking for roles
        if (!req.user || !req.user.admin) {
           let products= await productModel.find(); 
            return res.render('shop', { error: "Not authorized to access this resource",products });
        }

        // User is authorized, proceed to the next middleware or route
        next();
    };
}




module.exports={isLoggedin,isAuthorised};