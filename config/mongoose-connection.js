const mongoose=require('mongoose');

async function mongooseConnection(){

   await mongoose.connect("mongodb://127.0.0.1:27017/scatch").then(()=>{
        console.log("Database Connected");
    }).catch((err)=>{
        console.log(err);
    })

}

module.exports={mongooseConnection};