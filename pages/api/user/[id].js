import dbConnect from '../../../lib/dbConnect'
import Post from '../../../models/Post'
export default async function handler(req, res) {
  await dbConnect()
  switch (req.method) {
    case 'GET':
        let {id} = req.query;
      try {
        const allPosts = await Post.find({owner_id:id}).sort({_id:-1})
        res.status(200).json({ success: true, data: allPosts })
      } catch (error) {
        res.status(400).json({ success: false,error:error })
      }
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }
}