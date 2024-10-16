const express=require('express');
const router=express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const productModel=require('../models/product-model')
router.get('/',async(req,res)=>{
    let products=await productModel.find({});

    res.render('admin',{products});
})
router.get('/create',(req,res)=>{
    res.render('createproducts');
})

router.post('/products/create',upload.single('image'),async (req,res)=>{
   try {
    let{name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
    let product= await productModel.create({
    image:req.file.buffer,
    name,price,discount,
    bgcolor,
    panelcolor,
    textcolor
   })
    res.render('createproducts',{success:"Product created successfully"})
   } catch (err) {
    res.send(err.message)
   }

})

module.exports=router;