import { adminLogin ,adminRegister} from "../controllers/adminController";
import express from 'express'
import authMiddleware from "../middleware/auth";
const router=express.Router()
router.post('/adRegister',adminRegister)
router.post('/adLogin',adminLogin)
export default router