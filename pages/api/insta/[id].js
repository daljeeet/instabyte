import dbConnect from '../../../lib/dbConnect'
import Post from '../../../models/Post'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req
  await dbConnect()

  switch (method) {
    case "PATCH":
      try {
        const pet = await Post.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!pet) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: pet })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case "DELETE":
       try {
        const deletedPet = await Post.deleteOne({ _id: id })
        if (!deletedPet) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case "GET":
      try {
        const pet = await Post.findById(id)
        if (!pet) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: pet })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
