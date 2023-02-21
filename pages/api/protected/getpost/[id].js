import dbConnect from "@lib/dbConnect"
import {Comment} from "@models/Comment"
import {Likes} from "@models/Likes"

export default async function handler(req, res) {
  await dbConnect()
  const {id,method} = req;
  switch (method) {
    case 'GET':
      try {
        let postComments = Comment.find({parentId: id})
        let postLikes = Likes.find({parentId: id})
        let postData = [...postComments,postLikes]
        res.status(201).json({ success: true, data:postData})
      } catch (error) {
        res.status(400).json({ success: false, error})
      }
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }
}