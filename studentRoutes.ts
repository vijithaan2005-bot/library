import express from 'express'
import { studentRegister,studentLogin,getStudents,deleteStudent,  restoreStudent } from '../controllers/studentController'
import authMiddleware from '../middleware/auth'
const router=express.Router()
router.post('/stRegister',studentRegister)
router.post('/stLogin',studentLogin);
router.get('/', authMiddleware, getStudents);
router.delete('/:id', authMiddleware, deleteStudent);
router.post('/restore', authMiddleware, restoreStudent);
export default router