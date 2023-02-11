import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    caption:{type:String,required:true},
    imgUrl: {type:Array},
    owner: {type:String,required:true},
    owner_profile:{type:String,required:true},
    likes:{type:Array},
    posted_on:{type:String,required:true},
    comments:{type:Array},
    show_Caption:{type:Boolean,required:true},
    edit_post:{type:Boolean,required:true}
})

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);