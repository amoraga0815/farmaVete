import React from 'react';

export default function ProductInfo({ product, price, stock, qty, setQty, handleAddToCart }) {
  return (
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
  );
}
