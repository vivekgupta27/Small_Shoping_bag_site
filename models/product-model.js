const mongoose=require('mongoose');



const ProductSchema=mongoose.Schema({
   image:{
    type:String,
   },
   name:{
    type:String,
   },
   price:{
    type:Number,
   },
   discount:{
    type:Number,
    default:0,
   },
   bgcolor:{
    type:String,
   },
   panelcolor:{
    type:String,
   },
   textcolor:{
    type:String,
   }
})

module.exports=mongoose.model('product',ProductSchema);