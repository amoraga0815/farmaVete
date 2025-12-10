
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Toast } from 'bootstrap';
import { useDataContext } from '../data/DataContext';

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
    fetch(`http://localhost:4000/products/${id}`)
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
      // Actualizar stock en el backend y en el frontend
      const newStock = (typeof product.stock === 'number' ? product.stock : Number(product.stock)) - qty;
      try {
        // PATCH al backend para actualizar el stock
        await fetch(`http://localhost:4000/products/${product.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stock: newStock })
        });
        // Actualizar el producto localmente para reflejar el nuevo stock
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
      // Navegar a /tienda después de mostrar el toast
      setTimeout(() => {
        navigate('/tienda');
      }, 1200); // 1.2s para que el toast se vea
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
      {showLoginAlert && (
        <div className="alert alert-warning position-fixed top-0 start-50 translate-middle-x mt-3 shadow" style={{zIndex:2000, maxWidth:400}}>
          <i className="bi bi-exclamation-triangle me-2"></i>
          Debes iniciar sesión para agregar productos al carrito.
        </div>
      )}
      {showStockAlert && (
        <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-5 shadow" style={{zIndex:2000, maxWidth:400}}>
          <i className="bi bi-x-octagon me-2"></i>
          No hay suficiente stock para la cantidad seleccionada.
        </div>
      )}
      {/* migas de pan */}
      <nav className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/tienda">Alimento</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      {/* Galería */}
      <div className="product-gallery">
        <div className="product-gallery-card">
          <img src={product.image} alt={product.name} />
        </div>
      </div>

      {/* Información */}
      <div className="product-info">
        <h2 className="mb-2">{product.name}</h2>

        <div className="fs-4 fw-bold mb-2" style={{color:'#0f2c6e'}}>₡ {price.toLocaleString('es-CR')}</div>

        <p className="text-muted">
          Alimento de la marca {product.brand}. Fórmula para mascotas adultas. <br/>
        </p>

        <hr/>

        <div className="row g-2 small mb-3">
          <div className="col-6"><span className="text-muted">Proveedor:</span> <strong>{product.brand}</strong></div>
          <div className="col-6"><span className="text-muted">SKU:</span> <strong>{String(product.id).padStart(8,'0')}</strong></div>
          <div className="col-6">
            <span className="text-muted">Disponible:</span> {typeof stock === 'number' && stock > 0 ? (
              <span className="text-success">En Stock</span>
            ) : (
              <span className="text-danger">Sin Stock</span>
            )}
          </div>
          <div className="col-6 small text-muted">
            Stock disponible: <span className="fw-bold text-primary">{typeof stock === 'number' ? stock : 'N/D'}</span>
          </div>
          <div className="col-6"><span className="text-muted">Tags:</span> <span className="badge bg-light text-dark">{product.brand}</span></div>
        </div>

        {/* Selector de cantidad */}
        <div className="mb-3">
          <div className="small text-muted mb-1">Cantidad</div>
          <div className="input-group" style={{maxWidth:'200px'}}>
            <button className="btn btn-outline-secondary" onClick={()=>setQty(q=>Math.max(1, q-1))} disabled={qty<=1}>−</button>
            <input className="form-control text-center" value={qty} min={1} max={stock ?? 99} onChange={(e)=>setQty(Math.max(1, Math.min(stock ?? 99, parseInt(e.target.value || 1, 10))))} />
            <button className="btn btn-outline-secondary" onClick={()=>setQty(q=>Math.min((stock ?? 99), q+1))} disabled={typeof stock==='number' && qty>=stock}>+</button>
          </div>
        </div>

        {/* Acciones */}
        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
          <button className="btn btn-primary" onClick={handleAddToCart}>Agregar al Carrito</button>
        </div>
      </div>

      {/* Toast de confirmación */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="addedToast" className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              {product.name} se agregó al carrito.
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </section>
  );
}
