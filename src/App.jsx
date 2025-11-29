
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'   

export default function App() {
  return (
    <div className="app-grid">
      <Header />
      
      <main className="app-main" role="main" aria-label="Contenido principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Shop />} />
          <Route path="/producto/:id" element={<ProductDetail />} /> 
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

