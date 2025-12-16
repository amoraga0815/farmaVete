

import { useDataContext } from '../../data/DataContext';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URLS } from '../../apiConfig';
import CartTable from './components/cartmodal/CartTable';
import CartPaidInfo from './components/cartmodal/CartPaidInfo';
import CartEmpty from './components/cartmodal/CartEmpty';

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
      const prodRes = await fetch(`${API_URLS.products}/${productId}`);
      const prod = await prodRes.json();
      const newStock = (typeof prod.stock === 'number' ? prod.stock : Number(prod.stock)) + qty;
      await fetch(`${API_URLS.products}/${productId}`, {
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


  const handlePay = async () => {
    try {
      const res = await fetch(API_URLS.listCar);
      const listCars = await res.json();
      const userId = user?.id;
      const myCar = listCars.find(c => c.userId === userId && !c.paid);
      if (myCar) {
        // Generar número de factura (simple: timestamp + id)
        const facturaNum = 'F-' + myCar.id + '-' + Date.now();
        await fetch(`${API_URLS.listCar}/${myCar.id}`, {
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
    
  }, [paidInfo]);

  if (!show) return null;

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
              <CartPaidInfo paidInfo={paidInfo} />
            ) : localCart.length === 0 ? (
              <CartEmpty />
            ) : (
              <CartTable localCart={localCart} removing={removing} handleRemoveProduct={handleRemoveProduct} />
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
