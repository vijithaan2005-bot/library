import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Student from '../models/Student';



let deletedStudent: any = null;
let deleteTimer: NodeJS.Timeout | null = null;

export const studentRegister = async (
    req: Request,
    res: Response
) => {

    const {
        name,
        email,
        password
    } = req.body;

    try {

        const existingStudent =
            await Student.findOne({ email });

        if (existingStudent) {

            return res.status(400).json({
                message: 'Student already registered'
            });

        }

        const hashed =
            await bcrypt.hash(password, 10);

        const student =
            await Student.create({
                name,
                email,
                password: hashed
            });

        res.status(201).json({
            message: 'Student Registered',
            userId: student._id
        });

    } catch (err) {

        console.log(
            'STUDENT REGISTER ERROR:',
            err
        );

        res.status(500).json({
            message: 'Registration failed'
        });

    }
};

export const studentLogin = async (
    req: Request,
    res: Response
) => {

    const {
        email,
        password
    } = req.body;

    try {

        const student =
            await Student.findOne({ email });

        if (!student) {

            return res.status(404).json({
                message: 'Student not found'
            });

        }

        const isMatch =
            await bcrypt.compare(
                password,
                student.password
            );

        if (!isMatch) {

            return res.status(401).json({
                message: 'Invalid password'
            });

        }

       const secret = process.env.JWT_SECRET;

if (!secret) {
    console.log("JWT_SECRET is undefined");
    return res.status(500).json({
        message: "JWT_SECRET is missing"
    });
}

const token = jwt.sign(
    {
        userId: student._id
    },
    secret,
    {
        expiresIn: '1h'
    }
);

        return res.status(200).json({

            message: 'Login Successful',

            token,

            student: {
                id: student._id,
                name: student.name,
                email: student.email
            }

        });

    } catch (err) {

        console.log(
            'STUDENT LOGIN ERROR:',
            err
        );

        return res.status(500).json({
            message: 'Login Failed'
        });

    }
};

export const getStudents = async (
    req: Request,
    res: Response
) => {

    try {

        const students =
            await Student.find()
                .select('-password');

        res.status(200).json({
            students
        });

    } catch (err) {

        console.log(
            'GET STUDENTS ERROR:',
            err
        );

        res.status(500).json({
            message: 'Failed to fetch students'
        });

    }
};


export const deleteStudent = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            id
        } = req.params;

        // Find student first
        const student =
            await Student.findById(id);

        if (!student) {

            return res.status(404).json({
                message: 'Student not found'
            });

        }

        deletedStudent = {

            _id: student._id,

            name: student.name,

            email: student.email,

            password: student.password

        };


        await Student.findByIdAndDelete(id);


        if (deleteTimer) {

            clearTimeout(deleteTimer);

        }

        deleteTimer = setTimeout(() => {

            deletedStudent = null;

            deleteTimer = null;

            console.log(
                'Undo time expired. Student permanently deleted.'
            );

        }, 60 * 1000);


        res.status(200).json({

            message:
                'Student deleted. You have 1 minute to undo.',

            undoAvailable: true

        });

    } catch (err) {

        console.log(
            'DELETE STUDENT ERROR:',
            err
        );

        res.status(500).json({
            message: 'Failed to delete student'
        });

    }
};


export const restoreStudent = async (
    req: Request,
    res: Response
) => {

    try {

        if (!deletedStudent) {

            return res.status(400).json({

                message:
                    'Undo time expired. Student cannot be restored.'

            });

        }

        const existingStudent =
            await Student.findOne({
                email: deletedStudent.email
            });

        if (existingStudent) {

            return res.status(400).json({

                message:
                    'Student already exists.'

            });

        }

        await Student.create({

            _id: deletedStudent._id,

            name: deletedStudent.name,

            email: deletedStudent.email,

            password: deletedStudent.password

        });

        deletedStudent = null;
        if (deleteTimer) {

            clearTimeout(deleteTimer);

            deleteTimer = null;

        }


        res.status(200).json({

            message:
                'Student restored successfully.'

        });

    } catch (err) {

        console.log(
            'RESTORE STUDENT ERROR:',
            err
        );

        res.status(500).json({

            message:
                'Failed to restore student'

        });

    }
};



