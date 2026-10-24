import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        author: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            default: 1
        },

        availableQuantity: {
            type: Number,
            required: true,
            default: 1
        },

        image: {
            type: String,
            default: ''
        }
        
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Book', bookSchema);