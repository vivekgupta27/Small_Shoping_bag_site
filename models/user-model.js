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
    cart:{
        type:Array,
        default:[]
    },
    isadmin:{
        type:Boolean,
        default:false,
    },
    orders:{
        type:Array,
        default:[]
    },
    contact:{
        type:Number,
    },
})

module.exports=mongoose.model('user',UserSchema);