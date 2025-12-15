import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminPage() {
  const location = useLocation();
  const menu = [
    { key: 'usuarios', label: 'Usuarios', icon: 'bi-people' },
    { key: 'productos', label: 'Productos', icon: 'bi-box-seam' },
    { key: 'facturas', label: 'Facturas', icon: 'bi-receipt' },
  ];

 
  const activeTab = location.pathname.split('/').pop();

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-primary">Panel de Administración</h1>
      <div className="alert alert-info mb-4">Bienvenido, tienes acceso de administrador.</div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <ul className="nav nav-pills nav-justified gap-2 flex-column flex-md-row">
            {menu.map(item => (
              <li className="nav-item" key={item.key}>
                <Link
                  className={`nav-link d-flex align-items-center gap-2 ${activeTab === item.key ? 'active fw-bold' : ''}`}
                  style={{ fontSize: '1.08em', padding: '0.7em 1.2em' }}
                  to={`/admin/${item.key}`}
                >
                  <i className={`bi ${item.icon} fs-5`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
