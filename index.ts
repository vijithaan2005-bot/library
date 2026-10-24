import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db'
import adminRoutes from './routes/adminRoutes'
import studentRoutes from './routes/studentRoutes'
import bookRoutes from './routes/bookRoutes'
import transactionRoutes from './routes/transactionRoutes'
dotenv.config()
connectDB()
const app=express()
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static(path.join(process.cwd(),'uploads')))
app.use('/api/admin',adminRoutes)
app.use('/api/student',studentRoutes)
app.use('/api/book',bookRoutes)
app.use('/api/trans',transactionRoutes)
app.get('/',(req,res)=>{res.send("API is running ..............")})
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
