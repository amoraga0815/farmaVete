import { Link } from 'react-router-dom';
import React from 'react';

export default function PromoSection() {
  return (
    <section className="bg-primary text-white py-5">
      <div className="container text-center">
        <h2 className="fw-bold mb-3">¡Dale lo mejor a tu mascota!</h2>
        <p className="lead mb-4">Visita nuestra tienda y descubre todo lo que tenemos para el cuidado de tu mejor amigo.</p>
        <Link className="btn btn-light btn-lg px-4 fw-bold" to="/tienda">Ver Productos</Link>
      </div>
    </section>
  );
}
