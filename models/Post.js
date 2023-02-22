import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    caption:{type:String,required:true},
    imgUrl: {type:Array},
    author: {type:String,required:true},
    likes:{type:Array},
    posted_on:{type:String,required:true},
    comments:{type:Number},
})
 export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);