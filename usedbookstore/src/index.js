import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Routes} from "react-router-dom";
import Header from './components/books/header';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export default function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Routes path = "/" elemennt = {<Header />}>

      </Routes>
    </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
