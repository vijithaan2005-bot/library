import Admin from "../models/Admin";
import bcrypt from 'bcryptjs'
import  jwt from 'jsonwebtoken'
import {Request,Response} from 'express'
const JWT_SECRET=process.env.JWT_SECRET as string
export const adminRegister=async(req:Request,res:Response)=>{
   const{name,email,password}=req.body
   try{
           const hashed=await bcrypt.hash(password,10)
           const existingAdmin=await Admin.findOne({email})
           if(existingAdmin){
               return res.status(400).json({message:"Admin already registered"})
           }
           const admin=await Admin.create({name,email,password:hashed})
           res.status(201).json({message:"Admin Registered",userId:admin._id})
       }catch(err){
           res.status(500).json({message:"Registration failed"})
       }
}

export const adminLogin=async(req:Request,res:Response)=>{
    const{email,password}=req.body
    
    try{
         const admin=await Admin.findOne({email})
         if(!admin){
            return res.status(404).json({message:"Admin not found"})
         }
         
         const isMatch=await bcrypt.compare(password,admin.password)
         if(!isMatch){
            return res.status(401).json({message:"Invalid password"})
         }
         const token=jwt.sign({userId:admin._id},process.env.JWT_SECRET!,{expiresIn:'1h'}
         )
          
         console.log(token,"tttt")
         res.status(200).json({message:"Login Successful",token,admin:{
            id:admin._id,
            name:admin.name,
            email:admin.email
         }})
    }catch(err){
        res.status(500).json({message:"Login Failed"})
    }
   
}