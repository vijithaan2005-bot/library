import React from 'react'
import AdminReg from "./components/AdminReg";
import AdminLog from "./components/AdminLog";
import StudentLog from "./components/StudentLog";
import StudentReg from "./components/StudentReg";
import AdminDashboard from './components/AdminDashboard';
import Book from './components/Book';
import Student from './components/Student';
import Transaction from './components/Transaction';
import StudentDashboard from './components/StudentDashboard';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import AddBook from './components/AddBook';
import Home from './components/Home';
import Nav from './components/Nav'


function App() {
  return (
    <div>
        <BrowserRouter>
        <Nav/>
        <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/adreg" element={<AdminReg/>}/>
            <Route path="/adlog" element={<AdminLog/>}/>
            <Route path="/streg" element={<StudentReg/>}/>
            <Route path="/stlog" element={<StudentLog/>}/>
            <Route path="/addash" element={<AdminDashboard/>}/>
            <Route path="/books" element={<Book/>}/>
            <Route path="/students" element={<Student/>}/>
            <Route path="/transactions" element={<Transaction/>}/>
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/stdash" element={<StudentDashboard/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App