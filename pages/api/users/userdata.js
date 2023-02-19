import dbConnect from '../../../lib/dbConnect'
import Post from '../../../models/Post'
export default async function handler(req, res) {

  await dbConnect()
  switch (req.method) {
    case 'GET':
      const {data} = req;
      console.log(req.headers.authorization)
      try {
        // const Post = await Post.find({}).sort({_id:-1})
        res.status(200).json({ data:data })
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
