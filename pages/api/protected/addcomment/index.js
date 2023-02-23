import dbConnect from "../../../../lib/dbConnect"
import {Comment} from "../../../../models/Comments"

export default async function handler(req, res) {
  await dbConnect()
  const {method} = req;
  switch (method) {
    case 'POST':
      try {
        let newComment = new Comment(req.body);
        await newComment.save();
        res.status(201).json({ success: true, msg:"success"})
      } catch (error) {
        res.status(400).json({ success: false, error})
      }
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }
}