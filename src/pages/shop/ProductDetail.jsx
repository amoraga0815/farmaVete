

import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Toast } from 'bootstrap';
import { useDataContext } from '../../data/DataContext';
import { API_URLS } from '../../apiConfig';
import ProductGallery from './components/productDetail/ProductGallery';
import ProductInfo from './components/productDetail/ProductInfo';
import ProductBreadcrumbs from './components/productDetail/ProductBreadcrumbs';
import { LoginAlert, StockAlert } from './components/productDetail/ProductAlerts';
import ProductToast from './components/productDetail/ProductToast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const toastRef = useRef(null);
  const { addToCart, user } = useDataContext();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showStockAlert, setShowStockAlert] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URLS.products}/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (toastRef.current) {
      toastRef.current = new Toast(toastRef.current);
    }
  }, []);

  const price = product?.price ?? product?.fromPrice ?? 0;
  const stock = product && product.stock !== undefined ? Number(product.stock) : undefined;

  const handleAddToCart = async () => {
    if (!user) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 2500);
      return;
    }
    if (product) {
      if (typeof product.stock === 'number' && qty > product.stock) {
        setShowStockAlert(true);
        setTimeout(() => setShowStockAlert(false), 2500);
        return;
      }
      if (typeof product.stock === 'number' && product.stock <= 0) {
        setShowStockAlert(true);
        setTimeout(() => setShowStockAlert(false), 2500);
        return;
      }
      
      const newStock = (typeof product.stock === 'number' ? product.stock : Number(product.stock)) - qty;
      try {
        
        await fetch(`${API_URLS.products}/${product.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stock: newStock })
        });
        
        setProduct({ ...product, stock: newStock });
      } catch (err) {
        alert('Error actualizando el stock');
        return;
      }
      await addToCart({ ...product, stock: newStock }, qty);
      try {
        const el = document.getElementById('addedToast');
        if (el) new Toast(el).show();
      } catch {}
     
      setTimeout(() => {
        navigate('/tienda');
      }, 800); 
    }
  };

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning d-flex align-items-center justify-content-between">
          <div>{error || 'Producto no encontrado.'}</div>
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Volver</button>
        </div>
      </div>
    );
  }

  return (
    <section className="container-fluid p-3 product-detail-grid">
      <LoginAlert show={showLoginAlert} />
      <StockAlert show={showStockAlert} />
      <ProductBreadcrumbs product={product} />
      <ProductGallery image={product.image} name={product.name} />
      <ProductInfo
        product={product}
        price={price}
        stock={stock}
        qty={qty}
        setQty={setQty}
        handleAddToCart={handleAddToCart}
      />
      <ProductToast product={product} />
    </section>
  );
}
