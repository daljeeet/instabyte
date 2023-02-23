import dbConnect from "../../../../lib/dbConnect"
import {Comment} from "../../../../models/Comments"

export default async function handler(req, res) {
  await dbConnect()
  const {id,method} = req;
  switch (method) {
    case 'GET':
      try {
        let postComments =await Comment.find({parentId: id})
        res.status(201).json({ success: true, data:postComments})
      } catch (error) {
        res.status(400).json({ success: false, error})
      }
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }
}