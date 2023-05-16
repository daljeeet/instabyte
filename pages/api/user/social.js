import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/user';
import { setUserCookie } from '../../../lib/auth'
import { jsonResponse } from '../../../lib/utils'
export const config = {
    runtime: 'edge',
  }
export default async function handler(req, res) {
    await dbConnect();
    const {method,body} = req;
    switch (method) {
        case "POST":
            try{
                const userExist = await User.findOne({email:body.email});
                if(!userExist){
                    const data = {...body,username:body.email.split('@')[0]}
                    let newUser = new User(data)
                    let userData  = await newUser.save()
                    let resData= {name:userData.name,image:userData.image,_id:userData._id}
                    await setUserCookie(jsonResponse(200, resData))
                    // res.setHeader('Set-Cookie',`user-token=${token}; Path=/; HttpOnly`);
                    res.status(200).json({message:"user registered successfully"})
                }else{
                    let resData= {name:userExist.name,image:userExist.image,_id:userExist._id}
                    await setUserCookie(jsonResponse(200, resData))

                    // res.setHeader('Set-Cookie',`user-token=${token}; Path=/; HttpOnly`);
                    res.status(200).json({message:"login successfull"})
                }
            }catch(err){
                console.log("error:",err)
                res.status(404).json({msg:'login failed',err:err})
            }
            break;
        default:
            res.status(404).json({error:`mehtod ${method} is not allowed `})
            break;
    }
}