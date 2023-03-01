import dbConnect from '../../../lib/dbConnect'
import {Post} from '../../../models/Post'
export default async function handler(req, res) {
  await dbConnect()
  const {query,method}  = req
  const {id}  = query
  switch (method) {
    case 'GET':
      try {
        const allPosts = await Post.find({author: id})
        res.status(200).json({data:allPosts})
      } catch (error) {
        res.status(400).json({ success: false,error:error })
      }
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }
}

