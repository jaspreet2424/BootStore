import React from "react";
import Home from "./Users/Home";
import SingleBookDetail from "./Users/SingleBookDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Users/Login";
import AddBook from './Admin/AddBook'
import Contact from "./Users/Contact";
import Register from "./Users/Register";
import OTP from "./Users/OTP";
import Dashboard from './Admin/Dashboard'
import ViewBooks from "./Admin/ViewBooks";
import Profile from "./Users/Profile";
import BooksPage from "./Users/BooksPage";
import ViewSingleBook from "./Admin/ViewSingleBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/contact" element = {<Contact/>} />
        <Route path="/book/:id" element={<SingleBookDetail/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/user" element={<Profile/>} />
        <Route path="/books" element={<BooksPage/>} />
        <Route path="/otp_verification" element={<OTP/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/admin/dashboard" element = {<Dashboard/>} />
        <Route path="/admin/add_book" element = {<AddBook/>} />
        <Route path="/admin/view_books" element = {<ViewBooks/>} />
        <Route path="/admin/view_book/:id" element= {<ViewSingleBook/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
