import {Request,Response} from 'express'
import Book from '../models/Book'
export const addBook = async (req: any, res: any) => {

    try {

        const {
            bookId,
            title,
            author,
            category,
            quantity
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: 'Please upload a book image'
            });
        }

        const book = await Book.create({

            
            title,
            author,
            category,
            quantity,
            availableQuantity: quantity,

            image: `/uploads/book/${req.file.filename}`

        });

        res.status(201).json({
            message: 'Book added successfully',
            book
        });

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};
export const getBook=async(req:Request,res:Response)=>{
    try{
        const books=await Book.find()
        res.status(200).json(books)
    }catch(err){
        res.status(404).json({message:"Failed to fetch books"})
    }
}
   
export const updateBook=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const updated=await Book.findByIdAndUpdate(
            id,req.body,{
                new:true
            }
        )
        if(!updated){
            return res.status(404).json({message:"Book not found"})
        }
        res.status(200).json({message:"Book updated successfully",updated})
    }catch(err){
        res.status(400).json({message:"Failed to update book"})
    }

}
export const deleteBook=async(req:Request,res:Response)=>{
    try{
        const{id}=req.params
        const deleteBook=await Book.findByIdAndDelete(id)
        if(!deleteBook){
            return res.status(404).json({message:"Book not found"})
        }
        res.status(201).json({message:"Book deleted successfully"})
    }catch(err){
        res.status(404).json({message:"Failed to delete book"})
    }
}