import React from 'react';

export default function CartPaidInfo({ paidInfo }) {
  if (!paidInfo) return null;
  return (
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
  );
}
