import dbConnect from '../../../../lib/dbConnect'
import {Post} from '../../../../models/Post'
export default async function handler(req, res) {

  await dbConnect()
  switch (req.method) {
    case 'GET':
      try {
        const post = await Post.find().sort({_id:-1})
        res.status(200).json({ success: true, data: post })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }
}