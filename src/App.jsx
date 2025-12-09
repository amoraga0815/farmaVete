

import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import ReactQuery from './pages/ReactQuery.jsx'
import AddProduct from './pages/AddProduct.jsx'
import MantProduct from './pages/MantProduct.jsx'
import Registro from './pages/Registro.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminInvoices from './pages/admin/AdminInvoices.jsx';
import { useDataContext } from './data/DataContext';

export default function App() {
  const { user } = useDataContext();
  return (
    <div className="app-grid">
      <Header />
      <main
        className="app-main"
        role="main"
        aria-label="Contenido principal"
        style={{ overflowY: 'auto', height: '100%' }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/react-query" element={<ReactQuery />} />
          <Route path="/tienda" element={<Shop />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/addproducto" element={<AddProduct />} />
          <Route path="/mantproductos" element={<MantProduct />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin/*" element={user && user.userPerfil === 'Admin' ? <AdminPage /> : <Navigate to="/" replace />}>
            <Route index element={<AdminUsers />} />
            <Route path="usuarios" element={<AdminUsers />} />
            <Route path="productos" element={<AdminProducts />} />
            <Route path="productos/agregar" element={<AddProduct />} />
            <Route path="facturas" element={<AdminInvoices />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

