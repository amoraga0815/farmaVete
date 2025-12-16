import React from 'react';

export default function ContactoSection() {
  return (
    <section className="container py-5">
      <h2 className="text-center mb-5 fw-bold" style={{color:'#0f2c6e'}}>Contáctanos</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">    
          <div className="mt-4 text-center text-secondary">
            <div><i className="bi bi-geo-alt-fill"></i> San José, Costa Rica</div>
            <div><i className="bi bi-telephone-fill"></i> +506 2222-2222</div>
            <div><i className="bi bi-envelope-fill"></i> contacto@lunaernesto.vet</div>
          </div>
        </div>
      </div>
    </section>
  );
}
