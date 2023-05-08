import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    caption:{type:String,required:true},
    imgUrl: {type:Array},
    author: {type:mongoose.Types.ObjectId,required:true,ref:"users"},
    likes:{type:Array,default:[]}, 
    posted_on:{type:String,default:Date.now},
    comments_count:{type:Number,default:0},
})
 export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);