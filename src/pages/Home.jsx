

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <button
      onClick={scrollToTop}
      className="btn btn-primary position-fixed"
      style={{ right: 24, bottom: 24, zIndex: 999, borderRadius: '50%', width: 48, height: 48, display: visible ? 'block' : 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
      aria-label="Volver arriba"
    >
      <i className="bi bi-arrow-up" style={{ fontSize: 24 }}></i>
    </button>
  );
}

export default function Home() {
  return (
    <div className="home-vet bg-light" style={{ minHeight: '100vh', overflowY: 'auto' }}>
      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h1 className="display-4 fw-bold mb-3" style={{color:'#0f2c6e'}}>Bienvenido a Luna & Ernesto</h1>
            <p className="lead text-secondary mb-4">Tu farmacia veterinaria de confianza. Cuidamos la salud y bienestar de tus mascotas con productos de calidad y atención profesional.</p>
            <Link className="btn btn-primary btn-lg px-4 fw-bold" to="/tienda">Explora la Tienda</Link>
          </div>
          <div className="col-md-6 text-center">
            <img src="/products/choice.png" alt="Veterinaria Luna & Ernesto" className="img-fluid rounded shadow" style={{maxHeight:'320px'}} />
          </div>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="container py-5">
        <h2 className="text-center mb-5 fw-bold" style={{color:'#0f2c6e'}}>Nuestros Servicios</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <img src="/home/suplementos.png" className="card-img-top p-3" alt="Medicamentos veterinarios" style={{height:'180px',objectFit:'contain'}} />
              <div className="card-body">
                <h5 className="card-title fw-bold">Medicamentos y Suplementos</h5>
                <p className="card-text">Amplia variedad de medicamentos, vitaminas y suplementos para perros, gatos y animales exóticos.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <img src="/home/alimentos.png" className="card-img-top p-3" alt="Alimentos premium" style={{height:'180px',objectFit:'contain'}} />
              <div className="card-body">
                <h5 className="card-title fw-bold">Alimentos Premium</h5>
                <p className="card-text">Nutrición especializada para cada etapa de vida y necesidad de tu mascota. ¡Solo las mejores marcas!</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <img src="/home/veterinaria.png" className="card-img-top p-3" alt="Atención profesional" style={{height:'180px',objectFit:'contain'}} />
              <div className="card-body">
                <h5 className="card-title fw-bold">Atención Profesional</h5>
                <p className="card-text">Asesoría personalizada y atención veterinaria para el bienestar integral de tus animales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Mascotas Felices */}
      <section className="container py-5">
        <h2 className="text-center mb-5 fw-bold" style={{color:'#0f2c6e'}}>Mascotas Felices</h2>
        <div className="row g-4">
          <div className="col-6 col-md-3">
            <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" alt="Perro feliz" className="img-fluid rounded shadow-sm" />
          </div>
          <div className="col-6 col-md-3">
            <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=400&q=80" alt="Gato feliz" className="img-fluid rounded shadow-sm" />
          </div>
          <div className="col-6 col-md-3">
            <img src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80" alt="Conejo feliz" className="img-fluid rounded shadow-sm" />
          </div>
          <div className="col-6 col-md-3">
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Ave feliz" className="img-fluid rounded shadow-sm" />
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src="/products/choice.png" alt="Equipo veterinario" className="img-fluid rounded shadow" style={{maxHeight:'260px'}} />
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold mb-3" style={{color:'#0f2c6e'}}>¿Por qué elegirnos?</h3>
            <ul className="list-unstyled text-secondary fs-5">
              <li>✔️ Atención cálida y profesional</li>
              <li>✔️ Productos certificados y de alta calidad</li>
              <li>✔️ Experiencia y pasión por los animales</li>
              <li>✔️ Envíos rápidos y seguros</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="container py-5">
        <h2 className="text-center mb-5 fw-bold" style={{color:'#0f2c6e'}}>Testimonios</h2>
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <p className="card-text">"Excelente atención y productos de calidad. Mi perro Max está más saludable que nunca. ¡Gracias Luna & Ernesto!"</p>
                <div className="fw-bold">- Ana M.</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <p className="card-text">"Siempre encuentro lo que necesito para mis gatos y la asesoría es muy profesional. ¡Recomendado!"</p>
                <div className="fw-bold">- Carlos G.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="container py-5">
        <h2 className="text-center mb-5 fw-bold" style={{color:'#0f2c6e'}}>Contáctanos</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="bg-white p-4 rounded shadow">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" placeholder="Tu nombre" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="tu@email.com" />
              </div>
              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea className="form-control" rows="3" placeholder="¿En qué podemos ayudarte?"></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100 fw-bold">Enviar Mensaje</button>
            </form>
            <div className="mt-4 text-center text-secondary">
              <div><i className="bi bi-geo-alt-fill"></i> San José, Costa Rica</div>
              <div><i className="bi bi-telephone-fill"></i> +506 2222-2222</div>
              <div><i className="bi bi-envelope-fill"></i> contacto@lunaernesto.vet</div>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">¡Dale lo mejor a tu mascota!</h2>
          <p className="lead mb-4">Visita nuestra tienda y descubre todo lo que tenemos para el cuidado de tu mejor amigo.</p>
          <Link className="btn btn-light btn-lg px-4 fw-bold" to="/tienda">Ver Productos</Link>
        </div>
      </section>
      <ScrollToTopButton />
    </div>
  );
}
