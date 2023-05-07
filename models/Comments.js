import mongoose from 'mongoose'
const CommentSchema = new mongoose.Schema({
    author: {type:mongoose.Types.ObjectId,required:true,ref:"users"},
    post_id:{type:mongoose.Types.ObjectId,required:true,ref:"posts"},
    body:{type:String,required:true},
    created_at:{type:Number,required:true,default:Date.now},
    updated_at:{type:Number,required:true,default:Date.now},
    reply_count:{type:Number,required:true,default:0}
})
 export const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema); 