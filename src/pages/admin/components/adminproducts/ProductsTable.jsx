import React from 'react';

export default function ProductsTable({ productos, handleEdit, handleDelete }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#f5f5f5' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Marca</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stock</th>
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
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prod.stock}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <button onClick={() => handleEdit(prod)} style={{ marginRight: '0.5rem', background: '#2196f3', color: 'white', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px' }} >Editar</button>
              <button 
                onClick={() => handleDelete(prod.id)}
                style={{ background: '#f44336', color: 'white', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px'  }} 
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
