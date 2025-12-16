import React from 'react';

export default function PurchasesTable({ facturas }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle bg-white shadow-sm rounded">
        <thead className="table-primary">
          <tr>
            <th># Factura</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map(f => (
            <tr key={f.id}>
              <td className="fw-bold text-primary">{f.facturaNum}</td>
              <td>
                <ul className="list-unstyled mb-0">
                  {f.products.map(p => (
                    <li key={p.id} className="d-flex align-items-center gap-2 mb-1">
                      <span className="badge bg-light text-dark border">SKU: {String(p.id).padStart(8,'0')}</span>
                      <span className="badge bg-info text-white">x{p.qty}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="fw-bold text-success">₡ {f.total.toLocaleString('es-CR')}</td>
              <td>{new Date(parseInt(f.facturaNum.split('-')[2])).toLocaleString('es-CR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
