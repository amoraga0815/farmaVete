

import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './shared/Header.jsx'
import Footer from './shared/Footer.jsx'
import Home from './pages/home/Home.jsx'
import Shop from './pages/shop/Shop.jsx'
import ProductDetail from './pages/shop/ProductDetail.jsx'
import AddProduct from './pages/admin/components/AddProduct.jsx';
import Registro from './pages/auth/Registro.jsx';
import AdminPage from './pages/admin/AdminPage.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminInvoices from './pages/admin/AdminInvoices.jsx';
import { useDataContext } from './data/DataContext';
import PurchasesPage from './pages/shop/PurchasesPage.jsx';
import AddUser from './pages/admin/components/AddUser.jsx'

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
          <Route path="/tienda" element={<Shop />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/addproducto" element={<AddProduct />} />
          <Route path="/registro" element={<Registro />} />
          {user && <Route path="/compras" element={<PurchasesPage />} />}
          <Route path="/admin/*" element={user && user.userPerfil === 'Admin' ? <AdminPage /> : <Navigate to="/" replace />}>
            <Route index element={<AdminUsers />} />
            <Route path="usuarios" element={<AdminUsers />} />
            <Route path="productos" element={<AdminProducts />} />
            <Route path="productos/agregar" element={<AddProduct />} />
            <Route path="usuarios/agregar" element={<AddUser />} />
            <Route path="facturas" element={<AdminInvoices />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

