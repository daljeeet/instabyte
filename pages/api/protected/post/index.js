import dbConnect from "../../../../lib/dbConnect";
import { Post } from "../../../../models/Post";
export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const newPost = new Post(req.body);
        let post = await newPost.save();
        let data = await Post.aggregate([
          {
            $match:{_id:post._id}
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
        res.status(201).json({ success: true, data:data[0]});
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res
        .status(400)
        .json({ success: false, msg: `Cannot Find ${req.method}` });
  }
}
