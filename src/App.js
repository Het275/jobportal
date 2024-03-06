import logo from './logo.svg';
import './App.css';
import SamplePage from './SamplePage';
import Function from './function';
import CommonForm from './Form';
import SecondaryForm from './SampleForm';
import Params from './EventForm';
import { Route, Router, Routes, BrowserRouter, Link } from 'react-router-dom';
import About from './Pages/about';
import Home from './Pages/Home';
import Blog from './Pages/blog';
import VendorRegistration from './VenderRegistration'
import { useState, useEffect } from 'react';
      
function App() {
  return (
    <div className="App">
      <CommonForm />
    </div>
  );
}

export default App;
