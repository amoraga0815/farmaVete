
import { useDataContext } from '../data/DataContext';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CartModal({ show, onClose }) {
  const navigate = useNavigate();
  const { id } = useParams ? useParams() : {};
  const { cart, cartTotal, clearCart, user, removeFromCart } = useDataContext();
  const [localCart, setLocalCart] = useState(cart);
  const [removing, setRemoving] = useState(false);
  const [paidInfo, setPaidInfo] = useState(null);

  // Mantener localCart sincronizado con cart externo cuando se abre el modal
  useEffect(() => {
    if (show) setLocalCart(cart);
    // eslint-disable-next-line
  }, [show, cart]);

  // Eliminar producto del carrito y devolver stock
  const handleRemoveProduct = async (productId, qty) => {
    setRemoving(true);
    try {
      // 1. Devolver stock al producto
      const prodRes = await fetch(`http://localhost:4000/products/${productId}`);
      const prod = await prodRes.json();
      const newStock = (typeof prod.stock === 'number' ? prod.stock : Number(prod.stock)) + qty;
      await fetch(`http://localhost:4000/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      });
      // 2. Actualizar carrito local (solo en el modal)
      const newCart = localCart.filter(item => item.product.id !== productId);
      setLocalCart(newCart);
      // 3. Actualizar carrito global (contexto)
      await removeFromCart(productId);
    } catch (err) {
      alert('Error al eliminar producto del carrito');
    } finally {
      setRemoving(false);
    }
  };

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
        if (id) {
          navigate(`/producto/${id}`);
        }
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [paidInfo]);

  if (!show) return null;

  // Calcular el total del carrito local
  const localCartTotal = localCart.reduce((acc, item) => acc + (item.product.price ?? 0) * item.qty, 0);

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title"><i className="bi bi-cart me-2"></i>Tu Carrito</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={() => {
                if (id) {
                  navigate(`/producto/${id}`);
                }
                onClose();
              }}
            ></button>
          </div>
          <div className="modal-body">
            {paidInfo ? (
              <div className="alert alert-success text-center p-4" style={{ fontSize: '1.2em' }}>
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '2em' }}></i>
                <div className="mt-2">¡Pago realizado correctamente!</div>
                {paidInfo.facturaNum && (
                  <div className="mt-2">Número de factura: <span className="fw-bold text-primary">{paidInfo.facturaNum}</span></div>
                )}
                {paidInfo.error && (
                  <div className="mt-2 text-danger">{paidInfo.error}</div>
                )}
              </div>
            ) : localCart.length === 0 ? (
              <div className="alert alert-info text-center">No hay productos en el carrito.</div>
            ) : (
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {localCart.map(({ product, qty }) => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={product.image} alt={product.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>{qty}</td>
                      <td>₡ {product.price?.toLocaleString('es-CR')}</td>
                      <td>₡ {(product.price * qty).toLocaleString('es-CR')}</td>
                      <td>
                        <button className="btn btn-sm btn-danger" disabled={removing} title="Eliminar del carrito"
                          onClick={() => handleRemoveProduct(product.id, qty)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="text-end fw-bold">Total</td>
                    <td className="fw-bold text-primary">₡ {localCartTotal.toLocaleString('es-CR')}</td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => {
              if (id) {
                navigate(`/producto/${id}`);
              }
              onClose();
            }}>Cerrar</button>
            {!paidInfo && localCart.length > 0 && (
              <button type="button" className="btn btn-success" onClick={handlePay}>Pagar</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
