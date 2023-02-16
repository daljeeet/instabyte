import dbConnect from '../../../lib/dbConnect'
import Post from '../../../models/Post'
export default async function handler(req, res) {

  await dbConnect()
  switch (req.method) {
    case 'GET':
      const {page} = req.query;
      const skip = (page-1)*2;
      try {
        const pets = await Post.find({}).sort({_id:-1}).skip(skip).limit(2)
        res.status(200).json({ success: true, data: pets })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const post = await Post.create(req.body) /* create a new model in the database */
        res.status(201).json({ success: true, data: post })
      } catch (error) {
        res.status(400).json({ success: false, error})
      }
      break
    default:
      res.status(400).json({ success: false })
  }
}
