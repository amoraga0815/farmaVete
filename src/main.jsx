
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'bootstrap-icons/font/bootstrap-icons.css'

import './style.css'


import App from './App.jsx';
import Login from './pages/auth/Login.jsx';
import Registro from './pages/auth/Registro.jsx';
import { DataProvider, useDataContext } from './data/DataContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from 'react-router-dom';

function RootRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="*" element={<App />} />
    </Routes>
  );
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <BrowserRouter>
        <RootRouter />
      </BrowserRouter>
    </DataProvider>
  </QueryClientProvider>
);
