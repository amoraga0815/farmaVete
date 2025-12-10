import { useDataContext } from '../data/DataContext';
import { useState, useEffect } from 'react';

export default function CartModal({ show, onClose }) {
  const { cart, cartTotal, clearCart, user } = useDataContext();
  const [paidInfo, setPaidInfo] = useState(null);

  // Marcar carrito como pagado en la API y mostrar confirmación
  const handlePay = async () => {
    try {
      const res = await fetch('http://localhost:4000/ListCar');
      const listCars = await res.json();
      const userId = user?.id;
      const myCar = listCars.find(c => c.userId === userId && !c.paid);
      if (myCar) {
        // Generar número de factura (simple: timestamp + id)
        const facturaNum = 'F-' + myCar.id + '-' + Date.now();
        await fetch(`http://localhost:4000/ListCar/${myCar.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...myCar, paid: true, facturaNum })
        });
        setPaidInfo({ facturaNum });
      }
    } catch (err) {
      setPaidInfo({ error: 'Error al procesar el pago. Intente de nuevo.' });
      console.error('Error al pagar carrito:', err);
    }
  };

  // Limpiar el carrito y cerrar el modal tras mostrar el mensaje de pago exitoso
  useEffect(() => {
    if (paidInfo && paidInfo.facturaNum) {
      clearCart();
      const timer = setTimeout(() => {
        setPaidInfo(null);
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [paidInfo]);

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{background:'rgba(0,0,0,0.3)'}}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title"><i className="bi bi-cart me-2"></i>Tu Carrito</h5>
            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {paidInfo ? (
              <div className="alert alert-success text-center p-4" style={{fontSize:'1.2em'}}>
                <i className="bi bi-check-circle-fill text-success" style={{fontSize:'2em'}}></i>
                <div className="mt-2">¡Pago realizado correctamente!</div>
                {paidInfo.facturaNum && (
                  <div className="mt-2">Número de factura: <span className="fw-bold text-primary">{paidInfo.facturaNum}</span></div>
                )}
                {paidInfo.error && (
                  <div className="mt-2 text-danger">{paidInfo.error}</div>
                )}
              </div>
            ) : cart.length === 0 ? (
              <div className="alert alert-info text-center">No hay productos en el carrito.</div>
            ) : (
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(({ product, qty }) => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={product.image} alt={product.name} style={{width:48,height:48,objectFit:'cover',borderRadius:'8px',border:'1px solid #eee'}} />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>{qty}</td>
                      <td>₡ {product.price?.toLocaleString('es-CR')}</td>
                      <td>₡ {(product.price * qty).toLocaleString('es-CR')}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-end fw-bold">Total</td>
                    <td className="fw-bold text-primary">₡ {cartTotal.toLocaleString('es-CR')}</td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            {!paidInfo && cart.length > 0 && (
              <button type="button" className="btn btn-success" onClick={handlePay}>Pagar</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
