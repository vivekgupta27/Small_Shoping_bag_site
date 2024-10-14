const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('hey from product');
})


module.exports=router;