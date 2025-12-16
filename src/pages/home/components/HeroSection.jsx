import { Link } from 'react-router-dom';
import React from 'react';

export default function HeroSection() {
  return (
    <section className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
          <h1 className="display-4 fw-bold mb-3" style={{color:'#0f2c6e'}}>Bienvenido a Luna & Ernesto</h1>
          <p className="lead text-secondary mb-4">Tu farmacia veterinaria de confianza. Cuidamos la salud y bienestar de tus mascotas con productos de calidad y atención profesional.</p>
          <Link className="btn btn-primary btn-lg px-4 fw-bold" to="/tienda">Explora la Tienda</Link>
        </div>
        <div className="col-md-6 text-center">
          <img src="/home/ernestoluna.jpg" alt="Veterinaria Luna & Ernesto" className="img-fluid rounded shadow" style={{maxHeight:'320px'}} />
        </div>
      </div>
    </section>
  );
}
