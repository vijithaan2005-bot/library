import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Book.css';
import  { useNavigate } from 'react-router-dom'

function Book() {

    const [books, setBooks] = useState([]);
    const navigate=useNavigate('')
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

  

    const getBooks = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Please login as admin');
            return;
        }

        const res = await axios.get(
            'http://localhost:5000/api/book',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('BOOK RESPONSE:', res.data);

        setBooks(res.data.books || res.data);

    } catch (err) {
        console.log(
            'GET BOOK ERROR:',
            err.response?.data || err
        );

        setError(
            err.response?.data?.message ||
            'Failed to get books'
        );
    }
};



    useEffect(() => {
        getBooks();
    }, []);



    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            setImage(file);
        }
    };


    const addBook = async (e) => {

        e.preventDefault();

        setMessage('');
        setError('');

        try {

            const token =localStorage.getItem('token');

            if (!token) {

                setError(
                    'Please login as admin'
                );

                return;
            }



            const formData = new FormData();

            formData.append(
                'title',
                title
            );

            formData.append(
                'author',
                author
            );

            formData.append(
                'category',
                category
            );

            formData.append(
                'quantity',
                Number(quantity)
            );

            formData.append(
                'availableQuantity',
                Number(quantity)
            );


            if (image) {

                formData.append(
                    'image',
                    image
                );
            }


            const res = await axios.post('http://localhost:5000/api/book/add',formData, {
                    headers: { Authorization: `Bearer ${token}`}
                }
            );


            console.log(
                'ADD BOOK RESPONSE:',
                res.data
            );


            setMessage(
                res.data.message ||
                'Book added successfully'
            );


          

            setTitle('');
            setAuthor('');
            setCategory('');
            setQuantity('');
            setImage(null);


      

            const fileInput =
                document.getElementById(
                    'book-image'
                );

            if (fileInput) {
                fileInput.value = '';
            }


   

            getBooks();


        } catch (err) {

            console.log(
                'ADD BOOK ERROR:',
                err.response?.data || err
            );


            setError(
                err.response?.data?.message ||
                'Failed to add book'
            );
        }
    };




    const deleteBook = async (id) => {

        const confirmDelete =
            window.confirm(
                'Are you sure you want to delete this book?'
            );

        if (!confirmDelete) {
            return;
        }


        try {

            setMessage('');
            setError('');


            const token =
                localStorage.getItem('token');


            if (!token) {

                setError(
                    'Please login as admin'
                );

                return;
            }


            const res = await axios.delete(

                `http://localhost:5000/api/book/${id}`,

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }
                }
            );


            console.log(
                'DELETE RESPONSE:',
                res.data
            );


            setMessage(
                res.data.message ||
                'Book deleted successfully'
            );


           

            getBooks();


        } catch (err) {

            console.log(
                'DELETE BOOK ERROR:',
                err.response?.data || err
            );


            setError(
                err.response?.data?.message ||
                'Failed to delete book'
            );
        }
    };


    return (

        <div className="book-page">


           



            <div className="add-book-card">

                <div className="section-title">

                    

                    <div>

                        <h2>
                            Add New Book
                        </h2>

                        <p>
                            Add a new book to your
                            library collection
                        </p>

                    </div>

                </div>


                <form
                    onSubmit={addBook}
                    className="book-form"
                >
                    <div className="form-group">

                        <label>
                            Book Title
                        </label>

                        <input
                            type="text"
                            placeholder="Enter book title"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Author
                        </label>

                        <input
                            type="text"
                            placeholder="Enter author name"
                            value={author}
                            onChange={(e) =>
                                setAuthor(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(
                                    e.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                Select Category
                            </option>

                            <option value="Love">
                                 Love
                            </option>

                            <option value="Romantic">
                                 Romantic
                            </option>

                            <option value="Fiction">
                                 Fiction
                            </option>

                            <option value="Comedy">
                                 Comedy
                            </option>

                            <option value="Story">
                                 Story
                            </option>

                            <option value="Mystery">
                                 Mystery
                            </option>

                            <option value="Fantasy">
                                 Fantasy
                            </option>

                            <option value="Thriller">
                                 Thriller
                            </option>

                            <option value="Horror">
                                 Horror
                            </option>

                            <option value="Adventure">
                                 Adventure
                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>
                            Quantity
                        </label>

                        <input
                            type="number"
                            min="1"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Book Cover
                        </label>

                        <input
                            id="book-image"
                            type="file"
                            accept="image/*"
                            onChange={
                                handleImageChange
                            }
                            required
                        />

                        <small>
                            Choose a book image
                            from your laptop
                        </small>

                    </div>


                    {image && (

                        <div className="image-preview">

                            <p>
                                Selected Image:
                            </p>

                            <img
                                src={
                                    URL.createObjectURL(
                                        image
                                    )
                                }
                                alt="Book Preview"
                            />

                        </div>

                    )}


                    <button
                        type="submit"
                        className="add-book-btn"
                    >

                        Add Book

                    </button>

                </form>

                {message && (

                    <div className="success-message">

                        {message}

                    </div>

                )}


                {error && (

                    <div className="error-message">

                         {error}

                    </div>

                )}

            </div>



            <div className="all-books-card">

                <div className="section-title">

                    <div className="section-icon">
                    <img src="/images/books.png" alt="" />
                    </div>

                    <div>

                        <h2>
                            All Books
                        </h2>

                        <p>
                            Manage your library
                            collection
                        </p>

                    </div>

                </div>


                {books.length === 0 ? (

                    <div className="no-books">

                        <div>
                            <img src="/images/books.png" alt="" />
                        </div>

                        <h3>
                            No Books Available
                        </h3>

                        <p>
                            Add your first book
                            using the form above.
                        </p>

                    </div>

                ) : (

                    <div className="books-grid">

                        {books.map((book) => (

                            <div
                                className="book-card"
                                key={book._id}
                            >

                                <div className="book-image-container">

                                    {book.image ? (

                                        <img
                                            src={
                                                book.image.startsWith(
                                                    'http'
                                                )
                                                    ? book.image
                                                    : `http://localhost:5000${book.image}`
                                            }
                                            alt={
                                                book.title
                                            }
                                            className="book-image"
                                        />

                                    ) : (

                                        <div className="no-image">
                                            <img src="/images/books.png" alt="" />
                                        </div>

                                    )}

                                </div>

                                <div className="book-details">

                                    <h3>
                                        {book.title}
                                    </h3>

                                    <p className="author">
                                        {book.author}
                                    </p>

                                    <span className="category">
                                        {book.category}
                                    </span>


                                    <div className="book-info">

                                        <p>
                                            <strong>
                                                Quantity:
                                            </strong>{' '}
                                            {book.quantity}
                                        </p>

                                        <p>
                                            <strong>
                                                Available:
                                            </strong>{' '}
                                            {book.availableQuantity}
                                        </p>

                                    </div>


                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteBook(
                                                book._id
                                            )
                                        }
                                    >

                                         Delete Book

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
            <button
    onClick={() => navigate('/addash')}
    className="back-home-btn"
>
    ← 
</button>

        </div>
    );
}

export default Book;