import dbConnect from '../../../lib/dbConnect'
import {Post} from '../../../models/Post'
export default async function handler(req, res) {
  await dbConnect()
  switch (req.method) {
    case 'GET':
      const {page} = req.query;
      const skip = (page-1)*5;
      try {
        const allPosts = await Post.find().sort({_id:-1}).skip(skip).limit(5)
        res.status(200).json({ success: true, data: allPosts })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }
}