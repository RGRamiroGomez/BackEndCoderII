import mongoose from "mongoose"

const User = new mongoose.Schema({
    first_name : {type : String , required: true},
    last_name : {type : String , required: true},
    email : {type : String , unique : true , required : true},
    age : {type : Number },
    password : {type : String , required : true},
    cart : {type : mongoose.Schema.Types.ObjectId , ref : 'Cart'},
    role : {type : String , default : 'user'}
})

export const Users = mongoose.model('User', User)
