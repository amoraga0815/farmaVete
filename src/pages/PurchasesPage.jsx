import { useEffect, useState } from 'react';
import { useDataContext } from '../data/DataContext';
import { Link } from 'react-router-dom';
import { API_URLS } from '../apiConfig';

export default function PurchasesPage() {
  const { user } = useDataContext();
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(`${API_URLS.listCar}?userId=${user.id}&paid=true`)
        .then(res => res.json())
        .then(data => {
          setFacturas(data.filter(f => f.facturaNum));
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning shadow-sm mx-auto" style={{maxWidth:500}}>
          <i className="bi bi-person-circle fs-2 text-primary mb-2"></i>
          <div className="fw-bold mb-2">Debes iniciar sesión para ver tus compras.</div>
          <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-4 text-center">
        <h2 className="fw-bold text-primary mb-1"><i className="bi bi-receipt-cutoff me-2"></i>Mis Compras</h2>
        <div className="text-muted">Historial de facturas asociadas a tu cuenta</div>
      </div>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : facturas.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm mx-auto" style={{maxWidth:500}}>
          <i className="bi bi-emoji-frown fs-2 text-secondary mb-2"></i>
          <div className="fw-bold mb-2">No tienes compras realizadas.</div>
          <div className="text-muted">¡Explora la tienda y realiza tu primera compra!</div>
          <Link to="/tienda" className="btn btn-outline-primary mt-2">Ir a la tienda</Link>
        </div>
      ) : (
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
      )}
    </div>
  );
}
