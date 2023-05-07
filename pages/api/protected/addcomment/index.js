import dbConnect from "../../../../lib/dbConnect"
import {Comment} from "../../../../models/Comments"
import {User} from '../../../../models/user'
export default async function handler(req, res) {
  await dbConnect()
  const {method} = req;
  switch (method) {
    case 'POST':
      try {
        let newComment = new Comment(req.body);
       let savedComment =  await newComment.save();
      //  const commentAuthor = await User.findByIdAndUpdate({})
        res.status(201).json({ success: true, msg:"success"})
      } catch (error) {
        res.status(400).json({ success: false, error})
      }
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }
}