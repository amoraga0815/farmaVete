import React from 'react';

export default function InvoicesTable({ loading, error, filteredInvoices, getUserName }) {
  return (
    <div className="table-responsive">
      {loading ? (
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger m-3">{error}</div>
      ) : (
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>ID Factura</th>
              <th>ID Usuario</th>
              <th>Nombre Usuario</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Pagada</th>
              <th>Número Factura</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((factura, idx) => (
              <tr key={factura.id}>
                <td>{idx + 1}</td>
                <td>{factura.id}</td>
                <td>{factura.userId}</td>
                <td>{getUserName(factura.userId)}</td>
                <td>
                  {Array.isArray(factura.products) && factura.products.length > 0 ? (
                    <ul className="mb-0 ps-3">
                      {factura.products.map((p, i) => (
                        <li key={i}>
                          <span className="badge bg-secondary">ID: {p.id}</span> x <span className="fw-bold">{p.qty}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted">Sin productos</span>
                  )}
                </td>
                <td>₡{factura.total?.toLocaleString('es-CL') ?? 0}</td>
                <td>
                  {factura.paid ? (
                    <span className="badge bg-success">Sí</span>
                  ) : (
                    <span className="badge bg-danger">No</span>
                  )}
                </td>
                <td>{factura.facturaNum || <span className="text-muted">-</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
