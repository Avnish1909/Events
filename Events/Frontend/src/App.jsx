import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Events from './components/Events/Events';
import AddEvent from './components/Events/AddEvent';
import EventItem from './components/Events/EventItem/EventItem';

const Home = () => <h1>Welcome to Thought Lab!</h1>;

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
       <Routes>
       
        <Route path="/" element={<Events />} />
        <Route path="/AddEvents" element={<AddEvent/>} />
        <Route path="/events/:id" element={<EventItem />} />


        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
