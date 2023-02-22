import {User} from "../../../../models/user"
import dbConnect from '../../../../lib/dbConnect'

export default async function handler(req, res) {
    await dbConnect()
    const {query, method} = req;
    const {id}= query;
    switch (method) {
      case 'GET':
        try {
          let data =await User.find({id: id})
          res.status(200).json({success:true,data:data})
        } catch (error) {
          res.status(400).json({success: false, error})
        }
        break
      default:
        res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
    }
  }