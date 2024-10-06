import { User } from "../models/User.js"
import bcryptjs from 'bcryptjs'
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js'

export const signup = async(req,res)=>{
    const {email,password,name}=req.body;
   try{
    if(!email || !password || !name) {
        throw new Error ("All fields are required")
    }
    const userAlreadyExists= await User.findOne({email});

    if (userAlreadyExists){
        return res.status(400).json({success:false,message:'user Already exists'})
    }
    const hashedPassword=await bcryptjs.hash(password,10);
    const verificationToken= Math.floor(100000 + Math.random() *900000).toString();
    const user =new User({
        email,
        password:hashedPassword,
        name,
        verificationToken,
        veficationTokenExpressAt: Date.now() + 24*60*60*1000, //24 hours
    })
    await user.save();

    generateTokenAndSetCookie(res,user._id);

   await sendverficationEmail(user.email, verificationToken);
    
    res.status(201).json({success:true, message:"user created succssfully",
        user: {
            ...user._doc,
            password:undefined
        }
    });

   } catch(error){
    res.status(400).json({ success: false, message: error.message });
   }

    res.send("signup Route")
}

// export const login = async(req,res)=>{
//     res.send("signup Route")
// }
// export const logout = async(req,res)=>{
//     res.send("signup Route")
//}