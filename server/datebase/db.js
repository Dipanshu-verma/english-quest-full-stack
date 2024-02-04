const mongoose  = require("mongoose");
require("dotenv").config();
const USERNAME=  process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PASSWORD;


const mongoConnect = ()=>{
    const MONGODB_URL = `mongodb://${USERNAME}:${PASSWORD}@ac-dyxtfcd-shard-00-00.mbiyul4.mongodb.net:27017,ac-dyxtfcd-shard-00-01.mbiyul4.mongodb.net:27017,ac-dyxtfcd-shard-00-02.mbiyul4.mongodb.net:27017/?ssl=true&replicaSet=atlas-sixufj-shard-0&authSource=admin&retryWrites=true&w=majority`;

    mongoose.connect(MONGODB_URL,{useNewUrlParser:true})
    

mongoose.connection.on("connected", ()=>{
    console.log("mongo is connected successfully");
})

mongoose.connection.on("disconnected", ()=>{
    console.log("mongo is disconnected");
})

mongoose.connection.on("error", (error)=>{
    console.log(`error: ${error.message}`);
})


}

module.exports={mongoConnect}