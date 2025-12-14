
import React, { useEffect, useState } from 'react';
import { API_URLS } from '../../apiConfig';


export default function AdminInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userFilter, setUserFilter] = useState('');
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch facturas
        const resFact = await fetch(API_URLS.listCar);
        if (!resFact.ok) throw new Error('Error al obtener facturas');
        const dataFact = await resFact.json();
        const pagadas = dataFact.filter(f => f.paid);
        setInvoices(pagadas);

        // Fetch usuarios
        const resUsers = await fetch(API_URLS.users);
        if (!resUsers.ok) throw new Error('Error al obtener usuarios');
        const dataUsers = await resUsers.json();
        setUsers(dataUsers);

        // Calcular ventas por mes
        const ventasMes = {};
        pagadas.forEach(f => {
          let fecha = null;
          if (f.fecha) {
            fecha = new Date(f.fecha);
          } else if (f.facturaNum) {
            const parts = f.facturaNum.split('-');
            if (parts.length === 3 && !isNaN(Number(parts[2]))) {
              fecha = new Date(Number(parts[2]));
            }
          }
          if (fecha) {
            const mes = fecha.toLocaleString('es-CL', { month: 'short', year: 'numeric' });
            ventasMes[mes] = (ventasMes[mes] || 0) + (f.total || 0);
          }
        });
        const ventasMesArr = Object.entries(ventasMes).map(([mes, total]) => ({ mes, total }));
        ventasMesArr.sort((a, b) => {
          const [mA, yA] = a.mes.split(' ');
          const [mB, yB] = b.mes.split(' ');
          const dateA = new Date(`${mA} 1, ${yA}`);
          const dateB = new Date(`${mB} 1, ${yB}`);
          return dateA - dateB;
        });
        setVentasPorMes(ventasMesArr);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  // Filtrado por usuario
  const filteredInvoices = userFilter
    ? invoices.filter(f => String(f.userId).toLowerCase().includes(userFilter.toLowerCase()))
    : invoices;

  // Helper para obtener nombre completo del usuario
  const getUserName = (userId) => {
    const user = users.find(u => String(u.id) === String(userId));
    return user ? `${user.userName} ${user.userLastName}` : '-';
  };

  // Estadísticas
  const totalFacturas = filteredInvoices.length;
  const totalVentas = filteredInvoices.reduce((acc, f) => acc + (f.total || 0), 0);
  const productosVendidos = filteredInvoices.reduce((acc, f) => acc + (Array.isArray(f.products) ? f.products.reduce((a, p) => a + (p.qty || 0), 0) : 0), 0);

  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <i className="bi bi-receipt display-4 text-warning mb-2"></i>
        <h2 className="fw-bold">Dashboard de Facturas</h2>
        <p className="text-muted">Visualiza y gestiona todas las facturas generadas en el sistema.</p>
      </div>

      {/* Estadísticas */}
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

      {/* Estadística de ventas por mes */}
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

     {/* Filtro por usuario */}
      <div className="row mb-3 justify-content-end">
        <div className="col-md-4 col-sm-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por ID de usuario..."
            value={userFilter}
            onChange={e => setUserFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla de facturas */}
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white fw-bold fs-5">
          Todas las Facturas
        </div>
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
      </div>
    </div>
  );
}
