import React from 'react';

export default function InvoicesSalesByMonth({ ventasPorMes }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-info text-white fw-bold">Ventas por Mes</div>
      <div className="card-body p-0">
        {ventasPorMes.length === 0 ? (
          <div className="p-3 text-muted">No hay datos de ventas por mes.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm mb-0">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Total Vendido</th>
                </tr>
              </thead>
              <tbody>
                {ventasPorMes.map((v, i) => (
                  <tr key={i}>
                    <td>{v.mes}</td>
                    <td>₡{v.total.toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
