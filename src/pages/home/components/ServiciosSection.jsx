import React from 'react';

export default function ServiciosSection() {
  return (
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
  );
}
