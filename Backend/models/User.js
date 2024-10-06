import mongoose from 'mongoose'

const userSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
    },
    name: {
        type:String,
        required:true,
    },
    lastLogin: {
        type:Date,
        default: Date.now
    },
    isVerfied:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    veficationToken:String,
    veficationTokenExpressAt:Date,


}, {timestamps: true})

export const User=mongoose.model('User', userSchema)