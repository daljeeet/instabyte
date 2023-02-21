import mongoose from 'mongoose'

const likesSchema = new mongoose.Schema({
    author:{type:String,required:true},
    parentId:{type:String,required:true}
})
 export const Like = mongoose.models.Like || mongoose.model("Post", likesSchema);