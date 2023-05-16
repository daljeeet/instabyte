import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { setUserCookie } from '../../../lib/auth'
import { jsonResponse } from '../../../lib/utils'
import bcrypt from 'bcryptjs';
export const config = {
    runtime: 'edge',
  }
export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;
  switch (method) {
    case "POST":
      try {
        const { password } = body;
        const userExist = await User.findOne({ email: body.email });
        if (userExist) {
          const isPasswordMatch = await bcrypt.compare(password, userExist.password);
          if(isPasswordMatch){
            let resData = {
              name: userExist.name,
              image: userExist.image,
              _id: userExist._id,
            };
            await setUserCookie(jsonResponse(200, resData))
            res.status(200).json({message:"login successfull"});
          }
        } else {
          let error = new Error("Invalid Credentials");
          res.status(401).json(error);
        }
      } catch (err) {
        res.status(404).json(err);
      }
      break;
    default:
      res.status(404).json({ error: `mehtod ${method} is not allowed ` });
      break;
  }
}