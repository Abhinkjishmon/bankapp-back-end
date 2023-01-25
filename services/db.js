//Import mongooose in db.js
const mongoose = require('mongoose')

//Using mongoose define connection string
mongoose.connect('mongodb://localhost:27017/bank',()=>{
    console.log('MongoDB connected sucessfully');
})
//create model for the project 
//collection - users 

const User = mongoose.model('User',{
    username:String,
    acno:Number,
    password:String,
    balance:Number,
    transaction:[]
})


//export model
module.exports = {
    User
}