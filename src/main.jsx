
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'bootstrap-icons/font/bootstrap-icons.css'

import './style.css'


import App from './App.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import { DataProvider, useDataContext } from './data/DataContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from 'react-router-dom';

function RootRouter() {
  const { user } = useDataContext();
  if (user) {
    return <App />;
  }
  // Si no hay usuario, solo permitir login y registro
  return (
    <Routes>
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <BrowserRouter>
          <RootRouter />
        </BrowserRouter>
      </DataProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
