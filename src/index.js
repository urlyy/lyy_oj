import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div className='flex flex-col items-center flex-1 justify-between gap-3'>
      <App />
    </div>
  </BrowserRouter>
);