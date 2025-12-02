
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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function Root() {
  const { user } = useDataContext();
  return user ? <App /> : <Login />;
  //return user ? <App /> : <Registro />;
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <DataProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </DataProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
