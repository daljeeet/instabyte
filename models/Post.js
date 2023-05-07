import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    caption:{type:String,required:true},
    imgUrl: {type:Array},
    author: {type:mongoose.Types.ObjectId,required:true,ref:"User"},
    likes:{type:Array},
    posted_on:{type:String,required:true},
    comments_count:{type:Number,default:0},
})
 export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);