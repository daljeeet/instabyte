import dbConnect from '../../../lib/dbConnect'
import {User} from '../../../models/user';
export default async function handler(req, res) {
    await dbConnect();
    const {method} = req;
    switch (method) {
        case "POST":
            try{
                const userExist = await User.find({id: req.body.id});
                if(userExist.length==0){
                    const newUser = new User(req.body);
                   let user =  await newUser.save()
                    res.status(200).json({msg:true,user:user})
                }  
                res.status(200).json({msg:true,user:userExist[0]})
            }catch(err){
                res.status(404).json({msg:false,err:err})
            }
            break;
        default:
            res.status(404).json({error:`mehtod ${method} is not allowed `})
            break;
    }
}