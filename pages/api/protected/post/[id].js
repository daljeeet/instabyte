import dbConnect from "../../../../lib/dbConnect"
import {Post} from "../../../../models/Post"
import {Comment} from "../../../../models/Comments"

export default async function handler(req, res) {
  await dbConnect()
  const {query,method,body} = req;
  const {id} = query;
  switch (method) {
    case 'PATCH':
      try {
       let update= await Post.findByIdAndUpdate(id,body)
        let data = await Post.aggregate([
            {
              $match:{_id:update._id}
            },
            {
              $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author_data",
                pipeline: [
                  {
                    $project: {
                      _id: 1,
                      username: 1,
                      image: 1,
                    },
                  },
                ],
              },
            },
          ]);
        res.status(201).json({data:data[0]})
      } catch (error) {
        res.status(400).json({ success: false, error})
      }
      break
    case "DELETE":
      try{
        await Post.findByIdAndDelete({_id: id})
        await Comment.deleteMany({post_id: id})
        res.status(201).json({ success: true, msg:"post Deleted successfully"})
      }catch(err){
        res.status(400).json({msg:"error while deleting"})
      }
      break;
    case 'GET':
        try {
          const allPosts = await Post.find({author:id})
          res.status(200).json({data:allPosts})
        } catch (error) {
          console.log(error)
          res.status(400).json({ success: false,error:error })
        }
        break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }


}