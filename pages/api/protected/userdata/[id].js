import dbConnect from "../../../../lib/dbConnect"
import {User} from "../../../../models/User"
export const config = {
  runtime: 'edge',
}
export default async function protect(req, res) {
  await dbConnect()
  const {query: { id },method,} = req
  switch (method) {
    case 'GET':
      try {
        const userData = User.findbyId({_id:id})
        res.status(200).json({ success: true, data: userData })
      } catch (error) {
        res.status(400).json({ success: false, error})
      }
      break
    default:
      res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
  }
}