import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Student() {

    const [students, setStudents] = useState([]);

    const [message, setMessage] = useState('');

    const [error, setError] = useState('');

    const [undoId, setUndoId] = useState(null);

    const [undoTimer, setUndoTimer] = useState(0);

    const navigate = useNavigate();


    const getStudents = async () => {

        try {

            const token =
                localStorage.getItem('token');

            const res = await axios.get(
                'http://localhost:5000/api/student',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log(
                'STUDENT RESPONSE:',
                res.data
            );

            setStudents(
                res.data.students || res.data
            );

        } catch (err) {

            console.log(
                'GET STUDENTS ERROR:',
                err.response?.data || err
            );

            setError(
                err.response?.data?.message ||
                'Failed to get students'
            );
        }
    };


    useEffect(() => {

        getStudents();

    }, []);


    useEffect(() => {

        if (undoTimer <= 0) {
            return;
        }

        const timer = setInterval(() => {

            setUndoTimer((prev) => {

                if (prev <= 1) {

                    clearInterval(timer);

                    setUndoId(null);

                    return 0;
                }

                return prev - 1;

            });

        }, 1000);


        return () => {

            clearInterval(timer);

        };

    }, [undoTimer]);


    const deleteStudent = async (id) => {

        const confirmDelete =
            window.confirm(
                'Are you sure you want to delete this student?'
            );

        if (!confirmDelete) {
            return;
        }


        try {

            const token =
                localStorage.getItem('token');


            const res = await axios.delete(

                `http://localhost:5000/api/student/${id}`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            setMessage(
                res.data.message ||
                'Student deleted successfully'
            );

            setError('');


           

            setUndoId(id);

            setUndoTimer(60);


            getStudents();


        } catch (err) {

            console.log(
                'DELETE STUDENT ERROR:',
                err.response?.data || err
            );


            setError(
                err.response?.data?.message ||
                'Failed to delete student'
            );

            setMessage('');
        }
    };


    const undoDelete = async () => {

        try {

            const token =
                localStorage.getItem('token');


            const res = await axios.post(

                'http://localhost:5000/api/student/restore',

                {},

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            setMessage(
                res.data.message ||
                'Student restored successfully'
            );

            setError('');


            setUndoId(null);

            setUndoTimer(0);


            getStudents();


        } catch (err) {

            console.log(
                'UNDO ERROR:',
                err.response?.data || err
            );


            setError(
                err.response?.data?.message ||
                'Failed to restore student'
            );

            setMessage('');

            setUndoId(null);

            setUndoTimer(0);
        }
    };


    

    return (

        <div style={styles.page}>


            <div style={styles.header}>

                <div>

                    <h1 style={styles.title}>
                        Student Management
                    </h1>

                    <p style={styles.subtitle}>
                        Manage all registered library students
                    </p>

                </div>


                <div style={styles.countBox}>

                    <span style={styles.countNumber}>
                        {students.length}
                    </span>

                    <span style={styles.countText}>
                        Students
                    </span>

                </div>

            </div>



            {message && (

                <div style={styles.success}>

                     {message}

                </div>

            )}



            {error && (

                <div style={styles.error}>

                    {error}

                </div>

            )}



            {undoId && undoTimer > 0 && (

                <div style={styles.undoBox}>

                    <div>

                        <strong>
                            Student deleted!
                        </strong>

                        <p style={styles.undoText}>

                            You can undo this action for{' '}

                            <strong>
                                {undoTimer} seconds
                            </strong>.

                        </p>

                    </div>


                    <button
                        onClick={undoDelete}
                        style={styles.undoButton}
                    >

                        ↩ Undo Delete

                    </button>

                </div>

            )}



            <div style={styles.card}>

                <div style={styles.cardHeader}>

                    <h2 style={styles.cardTitle}>
                        Registered Students
                    </h2>


                    <span style={styles.badge}>

                        {students.length} Total

                    </span>

                </div>



                {students.length === 0 ? (

                    <div style={styles.empty}>

                        <div style={styles.emptyIcon}>
                            📚
                        </div>

                        <h3>
                            No Students Found
                        </h3>

                        <p>
                            There are currently no registered students.
                        </p>

                    </div>

                ) : (


                    <div style={styles.tableContainer}>

                        <table style={styles.table}>

                            <thead>

                                <tr>

                                    <th style={styles.th}>
                                        No.
                                    </th>

                                    <th style={styles.th}>
                                        Student
                                    </th>

                                    <th style={styles.th}>
                                        Email
                                    </th>

                                    <th style={styles.th}>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {students.map(
                                    (student, index) => (

                                        <tr
                                            key={student._id}
                                            style={styles.tr}
                                        >


                                            <td style={styles.td}>

                                                <span
                                                    style={styles.number}
                                                >

                                                    {index + 1}

                                                </span>

                                            </td>



                                            <td style={styles.td}>

                                                <div
                                                    style={
                                                        styles.studentInfo
                                                    }
                                                >

                                                    <div
                                                        style={
                                                            styles.avatar
                                                        }
                                                    >

                                                        {student.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase()}

                                                    </div>


                                                    <strong>
                                                        {student.name}
                                                    </strong>

                                                </div>

                                            </td>



                                            <td style={styles.td}>

                                                <span
                                                    style={
                                                        styles.email
                                                    }
                                                >

                                                    ✉ {student.email}

                                                </span>

                                            </td>



                                            <td style={styles.td}>

                                                <button

                                                    style={
                                                        styles.deleteButton
                                                    }

                                                    onClick={() =>
                                                        deleteStudent(
                                                            student._id
                                                        )
                                                    }

                                                >

                                                    🗑 Delete

                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>



            <button

                onClick={() =>
                    navigate('/addash')
                }

                style={styles.backHomeBtn}

            >

                ←

            </button>


        </div>
    );
}


const styles = {


    page: {

        minHeight: '100vh',

        background: '#f0fdf4',

        padding: '40px',

        fontFamily:
            'Arial, sans-serif',

        boxSizing: 'border-box'

    },


    header: {

        maxWidth: '1100px',

        margin: '0 auto 30px',

        display: 'flex',

        justifyContent:
            'space-between',

        alignItems: 'center'

    },


    title: {

        margin: 0,

        color: '#14532d',

        fontSize: '32px'

    },


    subtitle: {

        marginTop: '8px',

        color: '#64748b',

        fontSize: '15px'

    },



    countBox: {

        background: '#166534',

        color: 'white',

        borderRadius: '15px',

        padding: '15px 25px',

        display: 'flex',

        flexDirection: 'column',

        alignItems: 'center',

        minWidth: '100px',

        boxShadow:
            '0 8px 20px rgba(22,101,52,0.2)'

    },


    countNumber: {

        fontSize: '28px',

        fontWeight: 'bold'

    },


    countText: {

        fontSize: '13px',

        opacity: 0.9

    },



    success: {

        maxWidth: '1100px',

        margin: '0 auto 20px',

        padding: '14px 18px',

        borderRadius: '10px',

        background: '#dcfce7',

        color: '#166534',

        border:
            '1px solid #86efac'

    },



    error: {

        maxWidth: '1100px',

        margin: '0 auto 20px',

        padding: '14px 18px',

        borderRadius: '10px',

        background: '#fee2e2',

        color: '#b91c1c',

        border:
            '1px solid #fca5a5'

    },



    undoBox: {

        maxWidth: '1100px',

        margin: '0 auto 20px',

        padding: '16px 20px',

        borderRadius: '12px',

        background: '#fff7ed',

        color: '#9a3412',

        border:
            '1px solid #fdba74',

        display: 'flex',

        justifyContent:
            'space-between',

        alignItems: 'center',

        gap: '20px',

        boxShadow:
            '0 5px 15px rgba(0,0,0,0.08)'

    },


    undoText: {

        margin:
            '5px 0 0',

        fontSize: '14px'

    },


    undoButton: {

        background: '#166534',

        color: 'white',

        border: 'none',

        padding: '10px 17px',

        borderRadius: '8px',

        cursor: 'pointer',

        fontWeight: 'bold',

        fontSize: '14px',

        whiteSpace: 'nowrap'

    },


    card: {

        maxWidth: '1100px',

        margin: '0 auto',

        background: 'white',

        borderRadius: '18px',

        padding: '25px',

        boxShadow:
            '0 10px 30px rgba(0,0,0,0.08)'

    },


    cardHeader: {

        display: 'flex',

        justifyContent:
            'space-between',

        alignItems: 'center',

        marginBottom: '20px'

    },


    cardTitle: {

        margin: 0,

        color: '#1e293b',

        fontSize: '21px'

    },


    badge: {

        background: '#dcfce7',

        color: '#166534',

        padding: '7px 13px',

        borderRadius: '20px',

        fontSize: '13px',

        fontWeight: 'bold'

    },



    tableContainer: {

        overflowX: 'auto'

    },


    table: {

        width: '100%',

        borderCollapse: 'collapse'

    },


    th: {

        background: '#166534',

        color: 'white',

        padding: '15px',

        textAlign: 'left',

        fontSize: '14px'

    },


    td: {

        padding: '16px 15px',

        borderBottom:
            '1px solid #e2e8f0',

        color: '#334155'

    },


    tr: {

        transition:
            '0.2s'

    },



    number: {

        display: 'inline-flex',

        width: '30px',

        height: '30px',

        borderRadius: '50%',

        background: '#dcfce7',

        color: '#166534',

        alignItems: 'center',

        justifyContent: 'center',

        fontWeight: 'bold'

    },



    studentInfo: {

        display: 'flex',

        alignItems: 'center',

        gap: '12px'

    },


    avatar: {

        width: '40px',

        height: '40px',

        borderRadius: '50%',

        background: '#16a34a',

        color: 'white',

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'center',

        fontWeight: 'bold',

        fontSize: '17px'

    },


    email: {

        color: '#475569',

        fontSize: '14px'

    },

    deleteButton: {

        background: '#fee2e2',

        color: '#dc2626',

        border:
            '1px solid #fecaca',

        padding: '9px 14px',

        borderRadius: '8px',

        cursor: 'pointer',

        fontWeight: 'bold'

    },


    empty: {

        textAlign: 'center',

        padding: '60px 20px',

        color: '#64748b'

    },


    emptyIcon: {

        fontSize: '50px',

        marginBottom: '10px'

    },


    backHomeBtn: {

        position: 'fixed',

        right: '30px',

        bottom: '30px',

        zIndex: 9999,

        width: '50px',

        height: '50px',

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'center',

        background: '#166534',

        color: 'white',

        border: 'none',

        borderRadius: '12px',

        fontSize: '22px',

        fontWeight: '600',

        cursor: 'pointer',

        boxShadow:
            '0 6px 20px rgba(0,0,0,0.2)',

        transition:
            'all 0.3s ease'

    }

};


export default Student;