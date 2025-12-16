import React from 'react';

export default function TestimoniosSection() {
  return (
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
  );
}
