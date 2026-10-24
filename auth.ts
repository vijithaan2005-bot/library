import {Request,Response,NextFunction} from 'express'
import  jwt  from 'jsonwebtoken'
interface JwtPayloadShape{
    userId:String
    iat?:number
    exp?:number
}
const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    try{
        const authHeader=req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({message:"Unauthorized"})
        }
        const token=authHeader.split(' ')[1]!; 
        const secret=process.env.JWT_SECRET;
        if(!secret){
            return res.status(500).json({message:"Server misconfiguration"})
        }
        const decoded=jwt.verify(token,secret) as unknown as  JwtPayloadShape
        (req as any).userId=decoded.userId
         next()
    }catch(err){
        return res.status(401).json({err:"Invalid token"})
    }
}
export default authMiddleware
