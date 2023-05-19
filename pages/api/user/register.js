import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { SignJWT } from "jose";
import { USER_TOKEN, getJwtSecretKey } from "../../../lib/constants";
import { nanoid } from "@reduxjs/toolkit";
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
          let hash = await bcrypt.hash(password, saltRounds);
          let data = { ...body, password: hash };
          let newUser = new User(data);
          let userData = await newUser.save();
          let resData = {
            name: userData.name,
            image: userData.image,
            _id: userData._id,
          };
           // token for storing user data 
           let userToken = await jwt.sign(resData,getJwtSecretKey())
           // token for authencating user to protect routes
          const token = await new SignJWT({})
            .setProtectedHeader({ alg: "HS256" })
            .setJti(nanoid())
            .setIssuedAt()
            .setExpirationTime("7200h")
            .sign(new TextEncoder().encode(getJwtSecretKey()));
            res.setHeader("Set-Cookie",[`${USER_TOKEN}=${token}; Path=/; Max-Age=2600000;`,`token=${userToken}; Path=/; Max-Age=480000;`]);
          res.status(200).json({msg:"User Registred sussfully"})
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
