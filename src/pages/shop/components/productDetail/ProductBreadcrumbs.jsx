import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductBreadcrumbs({ product }) {
  return (
    <nav className="mb-3">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
        <li className="breadcrumb-item"><Link to="/tienda">Alimento</Link></li>
        <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
      </ol>
    </nav>
  );
}
