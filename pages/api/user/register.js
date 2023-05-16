import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { setUserCookie } from '../../../lib/auth'
import { jsonResponse } from '../../../lib/utils'
export const config = {
  runtime: "edge",
};
export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;
  switch (method) {
    case "POST":
      try {
        const { password } = body;
        const saltRounds = process.env.SALT;
        const userExist = await User.findOne({ email: body.email });
        if (!userExist) {
          let hash = bcrypt.hash(password, saltRounds);
          let data = { ...body, password: hash };
          let newUser = new User(data);
          let userData = await newUser.save();
          let resData = {
            name: userData.name,
            image: userData.image,
            _id: userData._id,
          };
          await setUserCookie(jsonResponse(200, resData));
          res.status(200).json(token);
        } else {
          let error = new Error("user already exist");
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
