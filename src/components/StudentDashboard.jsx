import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './StudentDashboard.css';

function StudentDashboard() {

 const navigate = useNavigate();
 const [undoTransaction, setUndoTransaction] = useState(null);

 const [books, setBooks] = useState([]);

 const [myBooks, setMyBooks] = useState([]);

 const [error, setError] = useState('');

 const [selectedCategory, setSelectedCategory] =
  useState('All');

 const categories = [
  'All',
  'Love',
  'Comedy',
  'Romantic',
  'Story',
  'Adventure',
  ' Horror',
  'Thriller',
  'Mystery',
  ' Fantasy',
 ];

 const studentData =
  localStorage.getItem('student');

 let student = null;

 try {

  if (
   studentData &&
   studentData !== 'undefined'
  ) {

   student = JSON.parse(studentData);

  }

 } catch (err) {

  console.log(
   'Invalid student data:',
   err
  );

  localStorage.removeItem('student');

 }

 const token =
  localStorage.getItem('token');
 const filteredBooks =
  selectedCategory === 'All'
   ? books
   : books.filter(
    (book) =>
     book.category ===
     selectedCategory
   );

 const getBooks = async () => {

  try {

   const res = await axios.get(
    'http://localhost:5000/api/book',
    {
     headers: {
      Authorization:
       `Bearer ${token}`
     }
    }
   );


   const data =
    res.data.books || res.data;


   setBooks(data);


  } catch (err) {

   console.log(
    'Book Error:',
    err
   );


   setError(
    err.response?.data?.message ||
    'Failed to fetch books'
   );

  }

 };
 const getMyBooks = async () => {

  if (
   !student?.id ||
   !token
  ) {

   return;

  }


  try {

   const res =
    await axios.get(

     `http://localhost:5000/api/trans/${student.id}`,

     {
      headers: {
       Authorization:
        `Bearer ${token}`
      }
     }

    );


   setMyBooks(
    res.data.transactions ||
    res.data
   );


  } catch (err) {

   console.log(
    'Transaction Error:',
    err
   );


   setError(
    err.response?.data?.message ||
    'Failed to fetch transactions'
   );

  }

 };

 const issueBook = async (bookId) => {

  if (
   !student?.id ||
   !token
  ) {

   navigate('/stlog');

   return;

  }

  if (!bookId) {

   alert(
    'This book does not have a valid MongoDB ID.'
   );

   return;

  }


  try {

   const dueDate =
    new Date();

   dueDate.setDate(
    dueDate.getDate() + 7
   );


   const res =
    await axios.post(

     'http://localhost:5000/api/trans/issue',

     {
      bookId: bookId,

      studentId:
       student.id,

      dueDate:
       dueDate
     },

     {
      headers: {
       Authorization:
        `Bearer ${token}`
      }
     }

    );


   setUndoTransaction(res.data.transaction);

await getBooks();
await getMyBooks();

setTimeout(() => {
    setUndoTransaction(null);
}, 60000);

  } catch (err) {

   console.log(
    'Borrow Error:',
    err
   );


   alert(
    err.response?.data?.message ||
    'Failed to borrow book'
   );

  }

 };
 const undoBorrow = async () => {

    if (!undoTransaction?._id) {
        return;
    }

    try {

        const res = await axios.post(
            'http://localhost:5000/api/trans/undo-issue',
            {
                transactionId: undoTransaction._id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert(
            res.data.message ||
            'Borrowing undone successfully'
        );

        setUndoTransaction(null);

        await getBooks();
        await getMyBooks();

    } catch (err) {

        console.log(
            'Undo Borrow Error:',
            err
        );

        alert(
            err.response?.data?.message ||
            'Failed to undo borrowing'
        );
    }
};


 const logout = () => {

  localStorage.removeItem(
   'token'
  );

  localStorage.removeItem(
   'student'
  );

  navigate('/stlog');

 };

 useEffect(() => {

  if (!student || !token) {

   navigate('/stlog');

   return;

  }


  getBooks();

  getMyBooks();

 }, []);

 if (!student) {

  return (

   <div className="student-dashboard">

    <div className="empty-message">

     <h2>
      Student information not found
     </h2>

     <button
      className="borrow-btn"
      onClick={() =>
       navigate('/stlog')
      }
     >
      Go to Login
     </button>

    </div>

   </div>

  );

 }


 return (

  <div className="student-dashboard">


   <main className="dashboard-content">


    <div className="welcome-card">

     <h1>

      Welcome, {student.name}!

     </h1>


     <p>

      Email: {student.email}

     </p>


     <p>

      Explore our library and
      borrow your favorite books.

     </p>

    </div>


    {error && (

     <div className="error-message">

      {error}

     </div>

    )}

    <h2 className="section-title">

     Available Books

    </h2>



    <div className="category-container">

     {categories.map(
      (category) => (

       <button
        key={category}

        className={
         selectedCategory ===
          category
          ? 'category-btn active'
          : 'category-btn'
        }

        onClick={() =>
         setSelectedCategory(
          category
         )
        }

       >

        {category}

       </button>

      )
     )}

    </div>


    {filteredBooks.length === 0 ? (

     <div className="empty-message">

      <h3>
       No books found
      </h3>

      <p>
       There are no books
       in this category.
      </p>

     </div>

    ) : (

     <div className="books-grid">

      {filteredBooks.map(
       (book) => (

        <div

         className="book-card"

         key={
          book._id ||
          book.bookId ||
          book.title
         }

        >

         <img
          className="book-image"
          src={
           book.image
            ? `http://localhost:5000${book.image}`
            : '/images/default-book.jpg'
          }
          alt={book.title}
          onError={(e) => {
           e.currentTarget.src = '/images/default-book.jpg';
          }}
         />

         <div className="book-details">


          <h3 className="book-title">

           {book.title}

          </h3>


          <p>

           <strong>
            Author:
           </strong>{' '}

           {book.author}

          </p>


          <p>

           <span className="category-label">

            {book.category}

           </span>

          </p>


          <p>

           <strong>
            Available:
           </strong>{' '}

           {
            book.availableQuantity
           }

          </p>

          {book.availableQuantity >
           0 ? (

           <button

            className="borrow-btn"

            onClick={() =>
             issueBook(
              book._id
             )
            }

           >

            Borrow Book

           </button>

          ) : (

           <button

            className="unavailable-btn"

            disabled

           >

            Not Available

           </button>

          )}

         </div>

        </div>

       )
      )}

     </div>
     

    )}
    {undoTransaction && (
    <div className="undo-borrow-box">
        <span>Book borrowed accidentally?</span>

        <button
            className="undo-borrow-btn"
            onClick={undoBorrow}
        >
            ↩ Undo Borrow
        </button>
    </div>
)}
    <section className="borrowed-section">


     <h2 className="section-title">

      My Borrowed Books

     </h2>


     {myBooks.length === 0 ? (

      <div className="empty-message">

       <h3>

        No borrowed books

       </h3>


       <p>

        You haven't borrowed
        any books yet.

       </p>

      </div>

     ) : (

      <div className="table-container">

       <table
        className="borrowed-table"
       >

        <thead>

         <tr>

          <th>
           Book
          </th>

          <th>
           Due Date
          </th>

          <th>
           Status
          </th>

         </tr>

        </thead>


        <tbody>

         {myBooks.map(
          (transaction) => (

           <tr
            key={
             transaction._id
            }
           >



            <td>

             {' '}

             {
              transaction
               .bookId
               ?.title ||
              'Book'
             }

            </td>




            <td>

             {
              transaction
               .dueDate
               ? new Date(
                transaction.dueDate
               ).toLocaleDateString()
               : 'N/A'
             }

            </td>



            <td>

             <span

              className={
               transaction.status ===
                'Issued'

                ? 'status-issued'

                : transaction.status ===
                 'Returned'

                 ? 'status-returned'

                 : 'status-overdue'
              }

             >

              {
               transaction.status
              }

             </span>

            </td>

           </tr>

          )
         )}
         

        </tbody>
        

       </table>
       

      </div>
      

     )}
     

    </section>
    


   </main>
   <button
                    className="back-home-btn"
                    onClick={() => navigate('/streg')}
                >
                    ← Back to Home
                </button>

   

  </div>

 );

}

export default StudentDashboard;