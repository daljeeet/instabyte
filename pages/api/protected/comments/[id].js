import mongoose from "mongoose";
import dbConnect from "../../../../lib/dbConnect";
import { Comment } from "../../../../models/Comments";
const { ObjectId } = mongoose.Types;
export default async function handler(req, res) {
  await dbConnect();
  const { query, method,body } = req;
  const { id } = query;
  switch (method) {
    case "GET":
      try {
        let allComments = await Comment.aggregate([
          {
            $match: {
              post_id: new ObjectId(id),
            },
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
        ]).sort({ _id: -1 });
        res.status(201).json({ success: true, data: allComments });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "DELETE":
      try {
        await Comment.findByIdAndDelete(id);
        res.status(200).json({message:"comment deleted successfully"})
      } catch (err) {
        res.status(400).json({ msg: err });
      }
      break;
    case "PATCH":
      try{
        await Comment.findByIdAndUpdate(id,body)
        let data = await Comment.aggregate([
            {
               $match:{_id: new ObjectId(id)},
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
        }
        ])
        res.status(200).json(data[0])
      }catch(err){
        console.log(err)
        res.status(400).json(err)
      }
    break
    default:
      res
        .status(400)
        .json({ success: false, msg: `Cannot Find ${req.method}` });
  }
}
