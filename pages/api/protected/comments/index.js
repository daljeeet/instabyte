import dbConnect from "../../../../lib/dbConnect";
import { Comment } from "../../../../models/Comments";
import { Post } from "../../../../models/Post";
export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        let newComment = new Comment(req.body);
        const savedComment = await newComment.save();
        let data = await Comment.aggregate([
          {$match:{_id:savedComment._id}},
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
        ])
        res.status(201).json({ success: true, msg: "success", comment: data[0] });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break; 
    default:
      res.status(400).json({ success: false, msg: `Cannot Find ${req.method}` });
  }
}
