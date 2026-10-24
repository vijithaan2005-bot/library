import express from 'express';
import authMiddleware from '../middleware/auth';
import {addBook,getBook,updateBook,deleteBook} from '../controllers/bookController';
import upload from '../middleware/upload';

const router = express.Router();

router.post( '/add', authMiddleware, upload.single('image'), addBook);
router.get('/',authMiddleware, getBook);
router.put('/:id',authMiddleware, updateBook);
router.delete('/:id',authMiddleware, deleteBook);

export default router;