

import { useDataContext } from '../data/DataContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';


export default function Header() {
  const ctx = useDataContext();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const userBtnRef = useRef(null);

  const handleUserClick = () => {
    if (!ctx.user) {
      navigate('/login');
    } else {
      setShowLogout((v) => !v);
    }
  };

  const handleLogout = () => {
    ctx.setUser(null);
    setShowLogout(false);
    navigate('/');
  };

  // Cierra el menú de logout si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (userBtnRef.current && !userBtnRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    if (showLogout) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogout]);

  return (
    <header>
      <div className="topbar text-center py-1">
        Envío estándar gratuito en pedidos superiores a ₡20,000
      </div>

      <nav className="navbar navbar-expand-lg site-nav">
        <div className="container-fluid px-3">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <span className="fw-bold fs-4" style={{color:'#0f2c6e'}}>LUNA & ERNESTO</span>
          </Link>

          {/* Toggler móvil */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú */}
          <div className="collapse navbar-collapse" id="mainNav">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/tienda">Productos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/react-query">React Query</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/mantproductos">Mant Producto</Link></li>
              {ctx.user && ctx.user.userPerfil === 'Admin' && (
                <li className="nav-item"><Link className="nav-link text-danger fw-bold" to="/admin"><i className="bi bi-shield-lock me-1"></i>Administración</Link></li>
              )}
            </ul>
            {/* Acciones */}
            <div className="d-flex align-items-center gap-3">
              <div ref={userBtnRef} className="position-relative">
                  <button
                    className="d-flex align-items-center gap-2 px-2 py-1 rounded-pill border-0 shadow-sm user-header-btn"
                    onClick={handleUserClick}
                    title={ctx.user ? ctx.user.userName : 'Iniciar sesión'}
                    style={{
                      background: ctx.user ? 'linear-gradient(90deg,#e3f0ff 0%,#f8fafd 100%)' : 'transparent',
                      transition: 'box-shadow 0.2s',
                      boxShadow: ctx.user ? '0 2px 8px rgba(0,0,0,0.07)' : 'none',
                      minWidth: '120px',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: 38,
                        height: 38,
                        background: ctx.user ? '#fff' : '#f0f0f0',
                        boxShadow: ctx.user ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                        border: ctx.user ? '1.5px solid #b6d4fe' : '1.5px solid #e0e0e0',
                        transition: 'border 0.2s',
                      }}
                    >
                      <i className="bi bi-person-circle fs-4 text-primary"></i>
                    </div>
                    {ctx.user ? (
                      <div className="d-flex flex-column align-items-start ms-1">
                        <span className="fw-semibold text-primary" style={{fontSize:'1rem',lineHeight:'1.1'}}>{ctx.user.userName}</span>
                        {ctx.user.userPerfil === 'Admin' && (
                          <span className="d-flex align-items-center gap-1 text-muted" style={{fontSize:'0.95em',marginTop:'2px',fontWeight:500}}>
                            <span>{ctx.user.userPerfil}</span>
                            <i className="bi bi-person-badge" style={{fontSize:'1em'}}></i>
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="ms-2 fw-semibold text-secondary" style={{fontSize:'1rem'}}>Iniciar Sesión</span>
                    )}
                  </button>
                {ctx.user && showLogout && (
                  <div className="position-absolute bg-white border rounded shadow p-2" style={{right:0, zIndex:100}}>
                    <button className="btn btn-outline-secondary btn-sm w-100" onClick={handleLogout} title="Cerrar sesión">
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
              <button className="btn btn-link text-dark position-relative">
                <i className="bi bi-cart fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
