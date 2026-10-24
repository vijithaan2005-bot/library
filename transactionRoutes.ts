import express from 'express';

import authMiddleware from '../middleware/auth';

import {issueBook,returnBook,undoReturn,getTransactions,getStudentTransactions,undoIssueBook} from '../controllers/transactionController';


const router = express.Router();


router.post('/issue',authMiddleware,issueBook);
router.post('/return',authMiddleware,returnBook);
router.post('/undo-return',authMiddleware,undoReturn);
router.get('/',authMiddleware,getTransactions);
router.get('/:studentId',authMiddleware,getStudentTransactions);
router.post('/undo-issue', authMiddleware, undoIssueBook);


export default router;