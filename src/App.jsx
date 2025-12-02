
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import ReactQuery from './pages/ReactQuery.jsx'
import AddProduct from './pages/AddProduct.jsx'
import MantProduct from './pages/MantProduct.jsx'

export default function App() {
  return (
    <div className="app-grid">
      <Header />
      
      <main className="app-main" role="main" aria-label="Contenido principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/react-query" element={<ReactQuery />} />
          <Route path="/tienda" element={<Shop />} />
          <Route path="/producto/:id" element={<ProductDetail />} /> 
          <Route path="/addproducto" element={<AddProduct />} />
          <Route path="/mantproductos" element={<MantProduct />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

