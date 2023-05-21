import User from "../../../../models/user"
import dbConnect from '../../../../lib/dbConnect'

export default async function handler(req, res) {
    await dbConnect()
    const {query, method} = req;
    const {id}= query;
    switch (method) {
      case 'GET':
        try {
          let data =await User.findOne({_id: id})
          .select('-password')
          .exec();
          if(data){
            res.status(200).json(data)
          }else{
            let error = new Error("No details found for the Profile")
            res.status(400).json(error)
          }
        } catch (error) {
          console.log(error)
          res.status(400).json(error)
        }
        break;
      case "PATCH":
        const {body} = req;
        try{
         await User.findByIdAndUpdate(id,body)
         let data = await User.findOne({_id:id})
         console.log(data)
          res.status(200).json(data)
        }catch(err){
          console.log(err)
          res.status(404).json(err)
        }
        break;
      default:
        res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
    }
  }