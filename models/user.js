import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email: {type:String,required:true},
    id:{type:String,required:true},
    profile:{type:String,required:true},
    username:{type:String},
    cover:{type:String,required:true}
})
 export const User = mongoose.models.User || mongoose.model("User", userSchema); 