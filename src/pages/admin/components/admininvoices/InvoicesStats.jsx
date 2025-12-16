import React from 'react';

export default function InvoicesStats({ totalVentas, totalFacturas, productosVendidos }) {
  return (
    <div className="row mb-4 g-3">
      <div className="col-md-4">
        <div className="card shadow-sm border-0 text-center h-100">
          <div className="card-body">
            <i className="bi bi-cash-coin display-6 text-success mb-2"></i>
            <h5 className="card-title">Total Ventas</h5>
            <p className="fs-4 fw-bold">₡{totalVentas.toLocaleString('es-CL')}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm border-0 text-center h-100">
          <div className="card-body">
            <i className="bi bi-receipt-cutoff display-6 text-primary mb-2"></i>
            <h5 className="card-title">Facturas Emitidas</h5>
            <p className="fs-4 fw-bold">{totalFacturas}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm border-0 text-center h-100">
          <div className="card-body">
            <i className="bi bi-box-seam display-6 text-info mb-2"></i>
            <h5 className="card-title">Productos Vendidos</h5>
            <p className="fs-4 fw-bold">{productosVendidos}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
