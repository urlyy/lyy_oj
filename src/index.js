import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
//用来Alert的
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/wangeditor.css'
import 'styles/animate.css'
import { Boot } from '@wangeditor/editor'
import formulaModule from '@wangeditor/plugin-formula'

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(formulaModule)



document.title = 'lyyOJ'

const root = ReactDOM.createRoot(document.getElementById('root'));




root.render(

  <BrowserRouter>
    <div className='flex flex-col items-center flex-1 justify-between'>
      <App />
      <ToastContainer />
    </div>
  </BrowserRouter>
);