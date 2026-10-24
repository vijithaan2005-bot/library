import mongoose from 'mongoose'
export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Mongodb connected")
    }catch(err){
        console.log("Mongodb connection failed",err)
    }
}