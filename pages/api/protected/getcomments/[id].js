import dbConnect from "../../../../lib/dbConnect"
import {Comment} from "../../../../models/Comments"

export default async function handler(req, res) {
  await dbConnect()
  const {query,method} = req;
  const {id} = query
  switch (method) {
    case 'GET':
      try {
        let allComments =await Comment.find({parentId: id})
        res.status(201).json({ success: true, data:allComments})
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, error})
      }
      break;
      case "DELETE":
        try{
          await Comment.findByIdAndDelete({_id: id})

        }catch(err){
          res.status(400).json({msg:err})
        }
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }
}