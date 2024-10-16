const express=require('express');
const app=express();
const userRoute=require('./routes/userRoute')
const adminRoute=require('./routes/adminRoute')
const indexRoute=require('./routes/indexRoute');


const cookieParser=require('cookie-parser');
const path=require('path');
const {mongooseConnection}=require('./config/mongoose-connection')
const {isLoggedin,isAuthorised}=require('./middleware/isLoggedin')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
mongooseConnection();
app.set("view engine",'ejs');

app.use('/',indexRoute)
app.use('/users',userRoute)
app.use('/admin',isLoggedin(),isAuthorised(),adminRoute)



app.listen(3000,()=>{
    console.log("Server connected");
})
