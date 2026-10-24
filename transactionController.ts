import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import Book from '../models/Book';




export const issueBook = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            bookId,
            studentId,
            dueDate
        } = req.body;

        const book = await Book.findById(bookId);

        if (!book) {

            return res.status(404).json({
                message: 'Book not found'
            });

        }

        if (book.availableQuantity <= 0) {

            return res.status(400).json({
                message: 'Book not available'
            });

        }

        const transaction = await Transaction.create({
            bookId,
            studentId,
            dueDate,
            status: 'Issued'
        });

        book.availableQuantity -= 1;

        await book.save();

        return res.status(201).json({
            message: 'Book issued successfully',
            transaction
        });

    } catch (err) {

        console.log('ISSUE BOOK ERROR:', err);

        return res.status(500).json({
            message: 'Failed to issue book'
        });

    }
};





export const returnBook = async (req: Request, res: Response) => {
    try {
        const { transactionId } = req.body;

        console.log("RETURN TRANSACTION ID:", transactionId);

        if (!transactionId) {
            return res.status(400).json({
                message: "Transaction ID is required"
            });
        }

        const transaction = await Transaction.findById(transactionId);

        console.log("FOUND TRANSACTION:", transaction);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        if (transaction.status === "Returned") {
            return res.status(400).json({
                message: "Book already returned"
            });
        }

        transaction.status = "Returned";
        transaction.returnDate = new Date();

        await transaction.save();

        console.log("TRANSACTION UPDATED:", transaction);

        const book = await Book.findById(transaction.bookId);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        book.availableQuantity += 1;

        await book.save();

        console.log(
            "BOOK AVAILABLE QUANTITY:",
            book.availableQuantity
        );

        return res.status(200).json({
            message: "Book returned successfully",
            transaction
        });

    } catch (err) {

        console.log("RETURN BOOK ERROR:", err);

        return res.status(500).json({
            message: "Failed to return book"
        });
    }
};




export const undoReturn = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            transactionId
        } = req.body;

        console.log(
            'UNDO TRANSACTION ID:',
            transactionId
        );

        const transaction =
            await Transaction.findById(transactionId);

        if (!transaction) {

            return res.status(404).json({
                message: 'Transaction not found'
            });

        }


        if (transaction.status !== 'Returned') {

            return res.status(400).json({
                message: 'This transaction is not returned'
            });

        }



        if (!transaction.returnDate) {

            return res.status(400).json({
                message: 'Return time not found'
            });

        }



        const now = new Date();

        const returnTime =
            new Date(transaction.returnDate);

        const difference =
            now.getTime() - returnTime.getTime();



        if (difference > 60000) {

            return res.status(400).json({
                message:
                    'Undo time expired. You can undo only within 1 minute.'
            });

        }



        transaction.status = 'Issued';

        transaction.returnDate = null;

        await transaction.save();



        const book =
            await Book.findById(transaction.bookId);

        if (book) {

            if (book.availableQuantity > 0) {

                book.availableQuantity -= 1;

                await book.save();

            }

        }


        return res.status(200).json({

            message:
                'Return undone successfully. Book is issued again.'

        });

    } catch (err) {

        console.log(
            'UNDO RETURN ERROR:',
            err
        );

        return res.status(500).json({
            message: 'Failed to undo return'
        });

    }
};





export const getTransactions = async (
    req: Request,
    res: Response
) => {

    try {

        const transactions =
            await Transaction
                .find()
                .populate('bookId')
                .populate('studentId')
                .sort({ issueDate: -1 });

        return res.status(200).json({
            transactions
        });

    } catch (err) {

        console.log(
            'GET TRANSACTIONS ERROR:',
            err
        );

        return res.status(500).json({
            message: 'Failed to fetch transactions'
        });

    }
};





export const getStudentTransactions = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            studentId
        } = req.params;

        if (!studentId) {

            return res.status(400).json({
                message: 'Student ID is required'
            });

        }

        const transactions =
            await Transaction
                .find({ studentId })
                .populate('bookId')
                .populate('studentId')
                .sort({ issueDate: -1 });

        return res.status(200).json({
            transactions
        });

    } catch (err) {

        console.log(
            'GET STUDENT TRANSACTIONS ERROR:',
            err
        );

        return res.status(500).json({
            message:
                'Failed to fetch student transactions'
        });

    }
};

export const undoIssueBook = async (req: Request, res: Response) => {
    try {
        const { transactionId } = req.body;

        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({
                message: 'Transaction not found'
            });
        }

        if (transaction.status !== 'Issued') {
            return res.status(400).json({
                message: 'This book cannot be undone'
            });
        }

        const book = await Book.findById(transaction.bookId);

        if (book) {
            book.availableQuantity += 1;
            await book.save();
        }

        await Transaction.findByIdAndDelete(transactionId);

        return res.status(200).json({
            message: 'Book borrowing undone successfully'
        });

    } catch (err) {
        console.log('UNDO ISSUE ERROR:', err);

        return res.status(500).json({
            message: 'Failed to undo borrowing'
        });
    }
};
