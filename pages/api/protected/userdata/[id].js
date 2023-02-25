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
          if(data.length>0){
            res.status(200).json({success:true,data:data})
          }else{
            res.status(400).json({success: false, error})
          }
        } catch (error) {
          res.status(400).json({success: false, error})
        }
        break;
      case "PATCH":
        try{
          await User.findByIdAndUpdate(id,req.body)
          res.status(200).json({success:true,msg:"user updated successfully"})
        }catch(err){
          res.status(404).json({success:false, msg:"cannot update the user"})
        }
        break;
      default:
        res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
    }
  }