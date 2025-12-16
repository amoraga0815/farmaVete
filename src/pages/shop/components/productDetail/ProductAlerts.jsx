import React from 'react';

export function LoginAlert({ show }) {
  if (!show) return null;
  return (
    <div className="alert alert-warning position-fixed top-0 start-50 translate-middle-x mt-3 shadow" style={{zIndex:2000, maxWidth:400}}>
      <i className="bi bi-exclamation-triangle me-2"></i>
      Debes iniciar sesión para agregar productos al carrito.
    </div>
  );
}

export function StockAlert({ show }) {
  if (!show) return null;
  return (
    <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-5 shadow" style={{zIndex:2000, maxWidth:400}}>
      <i className="bi bi-x-octagon me-2"></i>
      No hay suficiente stock para la cantidad seleccionada.
    </div>
  );
}
