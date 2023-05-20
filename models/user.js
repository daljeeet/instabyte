import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email: {type:String,required:true,unique:true},
    image:{type:String,required:true,default:"/demo_img.svg"},
    username:{type:String,unique:true,required:true},
    cover:{type:String,required:true,default:"/cover.jpg"},
    followers_count:{type:Number,required:true, default:0},
    following_count:{type:Number,required:true, default:0},
    password:{type:String}
})
 export default mongoose.models.User || mongoose.model('User', userSchema)