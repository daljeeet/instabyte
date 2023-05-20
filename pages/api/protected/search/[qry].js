import User from "../../../../models/user"
import dbConnect from '../../../../lib/dbConnect'
export default async function handler(req, res) {
    await dbConnect()
    const {query, method} = req;
    const {qry}= query;
    switch (method) {
      case 'GET':
        try {
          let data = await User.find({"name":{$regex:".*"+qry+".*",$options:"i"}}).select("name image _id").exec()
            res.status(200).json(data)
        } catch (error) {
          res.status(400).json(error)
        }
        break;
      default:
        res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
    }
  }