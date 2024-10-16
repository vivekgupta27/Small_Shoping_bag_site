const express=require('express');
const router=express.Router();
const{createAccount,userLogin,logout}=require('../controllers/user');

router.get('/',(req,res)=>{
    res.send('hey from user');
})

router.post('/register',createAccount());
router.post('/login',userLogin());
router.get('/logout',logout());

module.exports=router;