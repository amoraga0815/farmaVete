
import { Link } from 'react-router-dom'



export default function Header(){
  return (
    <header>
      <div className="topbar text-center py-1">
        Envíos dentro del GAM entre 48 y 72 horas (Costa Rica). Política de devolución de 30 días. Envío estándar gratuito en pedidos superiores a ₡65,000
      </div>

      <nav className="navbar navbar-expand-lg site-nav">
        <div className="container-fluid px-3">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <span className="fw-bold fs-4" style={{color:'#0f2c6e'}}>LA VETE</span>
          </a>

          {/* Toggler móvil */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú */}
          <div className="collapse navbar-collapse" id="mainNav">

<ul className="navbar-nav me-auto mb-2 mb-lg-0">
  <li className="nav-item"><Link className="nav-link" to="/tienda">Alimento</Link></li>
  <li className="nav-item"><a className="nav-link" href="#">Juguetes</a></li>
  <li className="nav-item"><a className="nav-link" href="#">Accesorios</a></li>
  <li className="nav-item"><a className="nav-link" href="#">Snacks</a></li>
  <li className="nav-item"><a className="nav-link" href="#">Farmacia</a></li>
  <li className="nav-item"><a className="nav-link" href="#">Cuidado de Mascotas</a></li>
</ul>

            {/* Acciones */}
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-link text-dark"><i className="bi bi-search fs-5"></i></button>
              <button className="btn btn-link text-dark"><i className="bi bi-person fs-5"></i></button>
              <button className="btn btn-link text-dark position-relative">
                <i className="bi bi-heart fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">1</span>
              </button>
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
