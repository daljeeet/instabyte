import dbConnect from "../../../../lib/dbConnect"
import {Post} from "../../../../models/Post"

export default async function handler(req, res) {
  await dbConnect()
  const {query,method} = req;
  const {id} = query;
  switch (method) {
    case 'PATCH':
      try {
        const newPost = await Post.findByIdAndUpdate({_id: id},req.body)
        res.status(201).json({ success: true, data:newPost})
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, error})
      }
      break
    case "DELETE":
      try{
         await Post.findByIdAndDelete({_id: id})
        res.status(201).json({ success: true, msg:"post Deleted successfully"})
      }catch(err){
        console.log(err)
        res.states(400).json({msg:"error while deleting"})
      }
      break;
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }


}