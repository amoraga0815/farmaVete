import React from 'react';

export default function CartTable({ localCart, removing, handleRemoveProduct }) {
  const localCartTotal = localCart.reduce((acc, item) => acc + (item.product.price ?? 0) * item.qty, 0);
  return (
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
  );
}
