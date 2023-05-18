import {SignJWT} from 'jose';
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/user';
import {USER_TOKEN, getJwtSecretKey } from '../../../lib/constants';
import { nanoid } from '@reduxjs/toolkit';
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    await dbConnect();
    const {method,body} = req;
    switch (method) {
        case "POST":
            try{
                console.log('from social')
                const userExist = await User.findOne({email:body.email});
                if(!userExist){
                    const data = {...body,username:body.email.split('@')[0]}
                    let newUser = new User(data)
                    let userData  = await newUser.save()
                    let resData= {name:userData.name,image:userData.image,_id:userData._id}
                    // token for storing user data 
                    let userToken = await jwt.sign(resData,getJwtSecretKey())
                    // token for authencating user to protect routes
                    const token = await new SignJWT({}).setProtectedHeader({ alg: 'HS256' }).setJti(nanoid()).setIssuedAt().setExpirationTime('7200h').sign(new TextEncoder().encode(getJwtSecretKey()))
                    res.setHeader("Set-Cookie", `${USER_TOKEN}=${token}; Path=/; Max-Age=480000; HttpOnly`);
                    res.status(200).json(userToken)
                }else{
                    let resData= {name:userExist.name,image:userExist.image,_id:userExist._id}
                    // token for storing user data 
                    let userToken = await jwt.sign(resData,getJwtSecretKey())
                    // token for authencating user to protect routes
                    const token = await new SignJWT({}).setProtectedHeader({ alg: 'HS256' }).setJti(nanoid()).setIssuedAt().setExpirationTime('7200h').sign(new TextEncoder().encode(getJwtSecretKey()))
                    res.setHeader("Set-Cookie", `${USER_TOKEN}=${token}; Path=/; Max-Age=2600000; HttpOnly`);
                      res.status(200).json(userToken)
                }
            }catch(err){
                console.log("error from social_media_login:",err)
                res.status(404).json({msg:'login failed',err:err})
            }
            break;
        default:
            res.status(404).json({error:`mehtod ${method} is not allowed `})
            break;
    }
}
