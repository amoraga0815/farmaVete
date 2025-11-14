
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }){
  const navigate = useNavigate()

  return (
    <div className="card-product">
      <img src={product.image} alt={product.name} loading="lazy" />

      <div className="title">{product.name}</div>

      <div className="d-flex align-items-center justify-content-between">
        <div className="rating" aria-label={`Calificación ${product.rating} de 5`}>
          {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5-Math.round(product.rating))}
        </div>
        <span className="muted small">{product.brand}</span>
      </div>

      <div className="d-grid gap-2">
        {product.fromPrice && (
          <div className="muted small">A partir de <strong>₡ {product.fromPrice.toLocaleString('es-CR')}</strong></div>
        )}
        {!product.fromPrice && (
          <div className="price fs-5">₡ {product.price.toLocaleString('es-CR')}</div>
        )}
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/producto/${product.id}`)}  // ⬅️ Ir al detalle
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  )
}

