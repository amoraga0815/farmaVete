import React from 'react';

export default function GaleriaSection() {
  return (
    <section className="container py-5">
      <h2 className="text-center mb-5 fw-bold" style={{color:'#0f2c6e'}}>Mascotas Felices</h2>
      <div className="row g-4">
        <div className="col-6 col-md-3">
          <img src="/home/mascotafeliz1.jpg" alt="" className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-6 col-md-3">
          <img src="/home/mascotafeliz2.jpg" alt="" className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-6 col-md-3">
          <img src="/home/mascotafeliz3.png" alt="" className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-6 col-md-3">
          <img src="/home/mascotafeliz4.jpg" alt="" className="img-fluid rounded shadow-sm" />
        </div>
      </div>
    </section>
  );
}
