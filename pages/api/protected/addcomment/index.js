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
        let postData = await Post.findOne({ _id: req.body.post_id });
        await Post.findByIdAndUpdate(postData._id, {
          comments_count: postData.comments_count + 1,
        });
        const savedComment = await newComment.save();
        res.status(201).json({ success: true, msg: "success", comment: savedComment });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false, msg: `Cannot Find ${req.method}` });
  }
}
