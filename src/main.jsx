
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'bootstrap-icons/font/bootstrap-icons.css'

import './style.css'

import App from './App.jsx'
import Login from './pages/Login.jsx';
import { DataProvider, useDataContext } from './data/DataContext';


function Root() {
  const { user } = useDataContext();
  return user ? <App /> : <Login />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
)
