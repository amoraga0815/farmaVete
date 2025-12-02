import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
function MantProduct() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);        
      })
      .catch();
  }, []);
 
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Productos</h1>
      <button
        style={{ marginBottom: '1rem', background: '#4caf50', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
        onClick={() => navigate('/addproducto')}
      >
        Agregar Producto
      </button>
     
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Marca</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prod.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prod.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prod.brand}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prod.price}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button style={{ marginRight: '0.5rem', background: '#2196f3', color: 'white', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px' }} >Editar</button>
                <button style={{ background: '#f44336', color: 'white', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px'  }} >Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
      {/* El div de hola ha sido removido para navegación */}
 
    </div>
  );
}
 
export default MantProduct;