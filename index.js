const express=require('express');
const app=express();
const userRoute=require('./routes/userRoute')
const productRoute=require('./routes/productRoute')


const cookieParser=require('cookie-parser');
const path=require('path');
const {mongooseConnection}=require('./config/mongoose-connection')


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
mongooseConnection();
app.set("view engine",'ejs');


app.use('/users',userRoute)
app.use('/products',productRoute)



app.listen(3000,()=>{
    console.log("Server connected");
})
