import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import {SignJWT} from 'jose';
import {USER_TOKEN, getJwtSecretKey } from '../../../lib/constants';
import { nanoid } from '@reduxjs/toolkit';
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
             // token for storing user data 
             let userToken = await jwt.sign(resData,getJwtSecretKey())
             // token for authencating user to protect routes
            const token = await new SignJWT({}).setProtectedHeader({ alg: 'HS256' }).setJti(nanoid()).setIssuedAt().setExpirationTime('7200h').sign(new TextEncoder().encode(getJwtSecretKey()))
            res.setHeader("Set-Cookie", `${USER_TOKEN}=${token}; Path=/; Max-Age=2600000; HttpOnly`);
            res.status(200).json(userToken)
          }
        } else {
          let error = new Error("Invalid Credentials");
          res.status(401).json(error);
        }
      } catch (err) {
        console.log(err)
        res.status(404).json(err);
      }
      break;
    default:
      res.status(404).json({ error: `mehtod ${method} is not allowed ` });
      break;
  }
}