import dbConnect from "../../../../lib/dbConnect"
import {Post} from "../../../../models/Post"

export default async function handler(req, res) {
  await dbConnect()
  const {query,method} = req;
  const {id} = query;
  switch (method) {
    case 'PATCH':
      try {
        const newPost = await Post.findByIdAndUpdate({_id: id},req.body)
        res.status(201).json({ success: true, data:newPost})
      } catch (error) {
        res.status(400).json({ success: false, error})
      }
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }


}