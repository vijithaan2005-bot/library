import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './Tranaction.css';


function Transaction() {

    const navigate = useNavigate();


    const [bookId, setBookId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [dueDate, setDueDate] = useState('');

    const [transactions, setTransactions] = useState([]);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    const [, setCurrentTime] = useState(Date.now());



    const getTransactions = async () => {

        try {

            const token =
                localStorage.getItem('token');

            const res = await axios.get(
                'http://localhost:5000/api/trans',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log(
                'TRANSACTION RESPONSE:',
                res.data
            );


            setTransactions(
                res.data.transactions ||
                res.data ||
                []
            );

        } catch (err) {

            console.log(
                'GET TRANSACTION ERROR:',
                err.response?.data || err
            );

            setError(
                err.response?.data?.message ||
                'Failed to fetch transactions'
            );

        }
    };

    useEffect(() => {

        getTransactions();

    }, []);

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(Date.now());

        }, 1000);


        return () => {

            clearInterval(timer);

        };

    }, []);



    const issueBook = async (e) => {

        e.preventDefault();

        setMessage('');
        setError('');


        try {

            const token =
                localStorage.getItem('token');


            const res = await axios.post(

                'http://localhost:5000/api/trans/issue',

                {
                    bookId,
                    studentId,
                    dueDate
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            setMessage(
                res.data.message ||
                'Book issued successfully'
            );


            setBookId('');
            setStudentId('');
            setDueDate('');


            getTransactions();


        } catch (err) {

            console.log(
                'ISSUE BOOK ERROR:',
                err.response?.data || err
            );


            setError(
                err.response?.data?.message ||
                'Failed to issue book'
            );

        }

    };


    const returnBook = async (
        transactionId
    ) => {

        setMessage('');
        setError('');


        try {

            const token =
                localStorage.getItem('token');


            const res = await axios.post(

                'http://localhost:5000/api/trans/return',

                {
                    transactionId
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            setMessage(
                res.data.message ||
                'Book returned successfully'
            );


            getTransactions();


        } catch (err) {

            console.log(
                'RETURN ERROR:',
                err.response?.data || err
            );


            setError(
                err.response?.data?.message ||
                'Failed to return book'
            );

        }

    };


    const undoReturn = async (
        transactionId
    ) => {

        setMessage('');
        setError('');


        try {

            const token =
                localStorage.getItem('token');


            const res = await axios.post(

                'http://localhost:5000/api/trans/undo-return',

                {
                    transactionId
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            setMessage(
                res.data.message ||
                'Return undone successfully'
            );


            getTransactions();


        } catch (err) {

            console.log(
                'UNDO RETURN ERROR:',
                err.response?.data || err
            );


            setError(
                err.response?.data?.message ||
                'Undo time expired'
            );


            getTransactions();

        }

    };




    const isOverdue = (transaction) => {

        if (
            transaction.status === 'Returned'
        ) {
            return false;
        }


        if (!transaction.dueDate) {
            return false;
        }


        const today = new Date();

        const due = new Date(
            transaction.dueDate
        );


        today.setHours(
            0, 0, 0, 0
        );

        due.setHours(
            0, 0, 0, 0
        );


        return today > due;

    };



    const getUndoSeconds = (
        returnDate
    ) => {

        if (!returnDate) {
            return 0;
        }


        const returnedAt =
            new Date(returnDate).getTime();


        const now =
            Date.now();


        const difference =
            now - returnedAt;


        const remaining =
            60000 - difference;


        return Math.max(
            0,
            Math.ceil(
                remaining / 1000
            )
        );

    };




    return (

        <div className="transaction-page">



            <div className="transaction-header">

                <div>

                    <h1 className="transaction-title">
                        Transaction Management
                    </h1>

                    <p className="transaction-subtitle">
                        Manage book issuing and returning
                    </p>

                </div>


                <div className="transaction-count-box">

                    <span className="transaction-count-number">
                        {transactions.length}
                    </span>

                    <span className="transaction-count-text">
                        Transactions
                    </span>

                </div>

            </div>




            {message && (

                <div className="transaction-success">


                </div>

            )}



            {/* ERROR */}

            {error && (

                <div className="transaction-error">

                    {error}

                </div>

            )}




            <div className="issue-card">

                <h2 className="section-title">
                    Issue a Book
                </h2>


                <p className="description">

                    Enter the book ID, student ID
                    and due date to issue a book.

                </p>


                <form
                    onSubmit={issueBook}
                    className="transaction-form"
                >



                    <div className="input-group">

                        <label className="input-label">
                            Book ID
                        </label>

                        <input
                            type="text"
                            placeholder="Enter Book ID"
                            value={bookId}
                            onChange={(e) =>
                                setBookId(
                                    e.target.value
                                )
                            }
                            className="transaction-input"
                            required
                        />

                    </div>




                    <div className="input-group">

                        <label className="input-label">
                            Student ID
                        </label>

                        <input
                            type="text"
                            placeholder="Enter Student ID"
                            value={studentId}
                            onChange={(e) =>
                                setStudentId(
                                    e.target.value
                                )
                            }
                            className="transaction-input"
                            required
                        />

                    </div>




                    <div className="input-group">

                        <label className="input-label">
                            Due Date
                        </label>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(
                                    e.target.value
                                )
                            }
                            className="transaction-input"
                            required
                        />

                    </div>




                    <button
                        type="submit"
                        className="issue-button"
                    >
                        Issue Book
                    </button>

                </form>

            </div>




            <div className="table-card">


                <div className="table-header">

                    <h2 className="section-title">
                        All Transactions
                    </h2>

                    <span className="transaction-badge">

                        {transactions.length}
                        {' '}
                        Records

                    </span>

                </div>



                {transactions.length === 0 ? (

                    <div className="transaction-empty">

                        <div className="empty-icon">
                            
                        </div>

                        <h3>
                            No Transactions Found
                        </h3>

                        <p>
                            There are currently no
                            book transactions.
                        </p>

                    </div>

                ) : (

                    <div className="table-container">

                        <table className="transaction-table">


                            <thead>

                                <tr>

                                    <th>
                                        N0.
                                    </th>

                                    <th>
                                        Book
                                    </th>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Issue Date
                                    </th>

                                    <th>
                                        Due Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>



                            <tbody>

                                {transactions.map(
                                    (t, index) => {

                                        const overdue =
                                            isOverdue(t);

                                        const undoSeconds =
                                            getUndoSeconds(
                                                t.returnDate
                                            );


                                        return (

                                            <tr
                                                key={t._id}
                                                className={
                                                    overdue
                                                        ? 'overdue-row'
                                                        : ''
                                                }
                                            >



                                                <td>

                                                    <span className="transaction-number">

                                                        {index + 1}

                                                    </span>

                                                </td>




                                                <td>

                                                    {t.bookId?.title ||
                                                        t.bookId ||
                                                        'N/A'}

                                                </td>




                                                <td>

                                                    {t.studentId?.name ||
                                                        t.studentId ||
                                                        'N/A'}

                                                </td>




                                                <td>

                                                    {t.issueDate
                                                        ? new Date(
                                                            t.issueDate
                                                        ).toLocaleDateString()
                                                        : 'N/A'}

                                                </td>




                                                <td>

                                                    <div
                                                        className={
                                                            overdue
                                                                ? 'due-date overdue-date'
                                                                : 'due-date'
                                                        }
                                                    >

                                                        {t.dueDate
                                                            ? new Date(
                                                                t.dueDate
                                                            ).toLocaleDateString()
                                                            : 'N/A'}


                                                        {overdue && (

                                                            <span className="overdue-warning">

                                                                ⚠ Overdue

                                                            </span>

                                                        )}

                                                    </div>

                                                </td>




                                                <td>

                                                    {overdue &&
                                                        t.status !== 'Returned' ? (

                                                        <span className="status-overdue">

                                                            ⚠ Overdue

                                                        </span>

                                                    ) : t.status === 'Returned' ? (

                                                        <span className="status-returned">

                                                            ✓ Returned

                                                        </span>

                                                    ) : (

                                                        <span className="status-issued">

                                                             Issued

                                                        </span>

                                                    )}

                                                </td>




                                                <td>


                                                    {t.status !== 'Returned' ? (

                                                        <button

                                                            className="return-button"

                                                            onClick={() =>
                                                                returnBook(
                                                                    t._id
                                                                )
                                                            }

                                                        >

                                                            ↩ Return Book

                                                        </button>

                                                    ) : undoSeconds > 0 ? (

                                                        <div className="undo-container">

                                                            <button

                                                                className="undo-button"

                                                                onClick={() =>
                                                                    undoReturn(
                                                                        t._id
                                                                    )
                                                                }

                                                            >

                                                                ↶ Undo Return

                                                            </button>


                                                            <span className="undo-timer">

                                                                {undoSeconds}s left

                                                            </span>

                                                        </div>

                                                    ) : (

                                                        <span className="undo-expired">

                                                            ✓ Returned

                                                        </span>

                                                    )}

                                                </td>


                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>




            <button

                className="backButton"

                onClick={() =>
                    navigate('/addash')
                }

            >

                ← 

            </button>


        </div>

    );

}


export default Transaction;