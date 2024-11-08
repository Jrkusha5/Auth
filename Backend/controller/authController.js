import { User } from "../models/User.js"
import bcryptjs from 'bcryptjs'
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js'
import {sendverificationEmail} from "../mailtrap/email.js";

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
        verificationTokenExpressAt: Date.now() + 24*60*60*1000, //24 hours
    })
    await user.save();

    generateTokenAndSetCookie(res,user._id);

     await sendverificationEmail(user.email, verificationToken);
    
    res.status(201).json({success:true, message:"user created succssfully",
        user: {
            ...user._doc,
            password:undefined
        }
    });

   } catch(error){
    res.status(400).json({ success: false, message: error.message });
   }

   
}
export const verifyEmail=async (req,res)=>{
    const {code}=req.body;
    try{
        const user=await User.findOne({
            verificationToken:code,
            verificationTokenExpressAt: {$gt:Date.now()}
        })
        if(!user){
            return res.status(400).json({success:false, message :"Invalid or expired verification code"})
        }
        user.isVerfied=true;
        user.verificationTokenExpressAt=undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);
    } catch(error){
        console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
    }
}



// export const login = async(req,res)=>{
//     res.send("signup Route")
// }
// export const logout = async(req,res)=>{
//     res.send("signup Route")
//}