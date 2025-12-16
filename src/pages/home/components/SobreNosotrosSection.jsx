import React from 'react';

export default function SobreNosotrosSection() {
  return (
    <section className="container py-5">
      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-md-5 d-flex justify-content-center mb-4 mb-md-0">
          <img
            src="/home/elegirnos.jpg"
            alt="Equipo veterinario"
            className="img-fluid rounded shadow"
            style={{ maxHeight: '320px', width: '100%', objectFit: 'contain', maxWidth: 420 }}
          />
        </div>
        <div className="col-12 col-md-6">
          <h3 className="fw-bold mb-3" style={{ color: '#0f2c6e' }}>¿Por qué elegirnos?</h3>
          <ul className="list-unstyled text-secondary fs-5">
            <li>✔️ Atención cálida y profesional</li>
            <li>✔️ Productos certificados y de alta calidad</li>
            <li>✔️ Experiencia y pasión por los animales</li>
            <li>✔️ Envíos rápidos y seguros</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
