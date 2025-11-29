
import { useMemo, useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import products from '../data/products.js'
import { Toast } from 'bootstrap' 

export default function ProductDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const product = useMemo(() => products.find(p => String(p.id) === String(id)), [id])


  if (!product){
    return (
      <div className="container py-4">
        <div className="alert alert-warning d-flex align-items-center justify-content-between">
          <div>Producto no encontrado.</div>
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Volver</button>
        </div>
      </div>
    )
  }


  const [qty, setQty] = useState(1)
  const [variant, setVariant] = useState('default')


  const toastRef = useRef(null)
  useEffect(() => {
    if (toastRef.current) {
      toastRef.current = new Toast(toastRef.current)
    }
  }, [])

  const price = product.price ?? product.fromPrice ?? 0


  const addToCart = () => {
    try {
      const el = document.getElementById('addedToast')
      if (el) new Toast(el).show()
    } catch {}
  }

  return (
    <section className="container-fluid p-3 product-detail-grid">
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
          (Descripción de ejemplo; reemplaza con la de tu catálogo real).
        </p>

        <hr/>

        <div className="row g-2 small mb-3">
          <div className="col-6"><span className="text-muted">Proveedor:</span> <strong>{product.brand}</strong></div>
          <div className="col-6"><span className="text-muted">SKU:</span> <strong>{String(product.id).padStart(8,'0')}</strong></div>
          <div className="col-6"><span className="text-muted">Disponible:</span> <span className="text-success">En Stock</span></div>
          <div className="col-6"><span className="text-muted">Tags:</span> <span className="badge bg-light text-dark">{product.brand}</span></div>
        </div>

        {/* Selector de cantidad */}
        <div className="mb-3">
          <div className="small text-muted mb-1">Cantidad</div>
          <div className="input-group" style={{maxWidth:'200px'}}>
            <button className="btn btn-outline-secondary" onClick={()=>setQty(q=>Math.max(1, q-1))}>−</button>
            <input className="form-control text-center" value={qty} onChange={(e)=>setQty(Math.max(1, parseInt(e.target.value || 1, 10)))} />
            <button className="btn btn-outline-secondary" onClick={()=>setQty(q=>q+1)}>+</button>
          </div>
        </div>

        {/* Acciones */}
        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
          <button className="btn btn-primary" onClick={addToCart}>Agregar al Carrito</button>
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
  )
}
