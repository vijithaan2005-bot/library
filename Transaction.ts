import mongoose from 'mongoose';

const transSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Book"
    },

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },

    issueDate: {
        type: Date,
        required: true,
        default: Date.now
    },

    dueDate: {
        type: Date,
        required: true
    },

    returnDate: {
        type: Date,
        default: null
    },

    status: {
        type: String,
        enum: ["Issued", "Returned", "Overdue"],
        default: "Issued"
    }
});

export default mongoose.model("Trans", transSchema);