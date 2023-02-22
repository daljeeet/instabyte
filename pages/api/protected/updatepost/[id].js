import dbConnect from "../../../../lib/dbConnect"
import {Post} from "../../../models/Post"

export default async function handler(req, res) {
  await dbConnect()
  switch (req.method) {
    case 'PATCH':
      // try {
      //   const newPost = new Post(req.body)
      //   newPost.save()
      //   res.status(201).json({ success: true, data: "post Added successfully" })
      // } catch (error) {
      //   res.status(400).json({ success: false, error})
      // }
      res.status(200).json({data:req.body})
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }


}