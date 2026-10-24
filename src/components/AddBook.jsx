import React, { useState } from 'react';
import  { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './AddBook.css';

function AddBook() {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [bookId, setBookId] = useState('');
    const navigate=useNavigate('')
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const addBook = async (e) => {

        e.preventDefault();

        setMessage('');
        setError('');

        try {

            const token = localStorage.getItem('token');

            const formData = new FormData();

            formData.append('title', title);
            formData.append('author', author);
            formData.append('category', category);
            formData.append('quantity', Number(quantity));
            formData.append('availableQuantity', Number(quantity));
            formData.append('bookId', bookId);

            if (image) {
                formData.append('image', image);
            }

            const res = await axios.post(
                'http://localhost:5000/api/book/add',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setMessage(
                res.data.message || 'Book added successfully'
            );

            setTitle('');
            setAuthor('');
            setCategory('');
            setQuantity('');
            setImage(null);
            setBookId('');

            document.getElementById('bookImage').value = '';

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

    return (
        <div className="add-book-page">

            <div className="add-book-container">

                <div className="add-book-header">

                   

                    <div>
                        <h2>Add New Book</h2>

                        <p>
                            Add a new book to your library collection
                        </p>
                    </div>

                </div>

                <form
                    onSubmit={addBook}
                    className="add-book-form"
                >

                    <div className="form-group">

                        <label>Book Title</label>

                        <input
                            type="text"
                            placeholder="Enter book title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Author</label>

                        <input
                            type="text"
                            placeholder="Enter author name"
                            value={author}
                            onChange={(e) =>
                                setAuthor(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Category</label>

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
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

                        <label>Quantity</label>

                        <input
                            type="number"
                            min="1"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Book Image</label>

                        <input
                            id="bookImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImage(e.target.files[0])
                            }
                            required
                        />

                        <small>
                            Select a book image from your laptop
                        </small>

                    </div>


                    {image && (

                        <div className="image-preview">

                            <p>Image Preview</p>

                            <img
                                src={URL.createObjectURL(image)}
                                alt="Book Preview"
                                width="120"
                                height="160"
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: '10px'
                                }}
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
                        ✓ {message}
                    </div>

                )}


                {error && (

                    <div className="error-message">
                        ✕ {error}
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

export default AddBook;