import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/user';
export default async function handler(req, res) {
    await dbConnect();
    const {method,body} = req;
    switch (method) {
        case "POST":
            try{
                const userExist = await User.findOne({username:body.username});
                if(userExist){
                    res.status(200).json({user:true})
                }else{
                    res.status(200).json({user:false})
                }
            }catch(err){
                console.log(err)
                res.status(404).json({msg:false,err:err})
            }
            break;
        default:
            res.status(404).json({error:`mehtod ${method} is not allowed `})
            break;
    }
}