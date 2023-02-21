import mongoose from 'mongoose'
const CommentSchema = new mongoose.Schema({
    author:{type:String,required:true},
    comment:{type:String,required:true},
    time:{type:String,required:true},
    parentId:{type:String,required:true}
})
 export const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema); 