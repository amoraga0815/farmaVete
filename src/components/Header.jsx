
import { useDataContext } from '../data/DataContext.jsx'
import { Link } from 'react-router-dom'



export default function Header(){

  const ctx = useDataContext();

  return (
    <header>
      <div className="topbar text-center py-1">
        Envíos dentro del GAM entre 48 y 72 horas (Costa Rica). Política de devolución de 30 días. Envío estándar gratuito en pedidos superiores a ₡65,000
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
  
</ul>
            {/* Acciones */}
            <div className="d-flex align-items-center gap-3">
              <div className="navbar-text ms-3">
              Usuario: <span>{ctx.user?.username || '-'}</span> Perfil: <span>{ctx.user?.password || '-'}</span>
            </div>
              <button className="btn btn-link text-dark position-relative">
                <i className="bi bi-cart fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">2</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
