import dbConnect from "../../../lib/dbConnect"
import {Post} from "../../../models/Post"

export default async function handler(req, res) {
  await dbConnect()
  switch (req.method) {
    case 'POST':
      try {
        const newPost = new Post(req.body)
        let newPst = await newPost.save()
        res.status(201).json({ success: true, data: newPst})
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, error})
      }
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }
}