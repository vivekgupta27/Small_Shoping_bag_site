const mongoose=require('mongoose');



const UserSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    isadmin:{
        type:Boolean,
        default:false,
    },
    orders:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
})

module.exports=mongoose.model('user',UserSchema);