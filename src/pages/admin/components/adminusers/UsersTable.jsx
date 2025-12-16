import React from 'react';

export default function UsersTable({ usuarios, handleEdit, handleDelete }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#f5f5f5' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Apellido</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Perfil</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((user) => (
          <tr key={user.id}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.userName}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.userLastName}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.userEmail}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.userPerfil}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <button onClick={() => handleEdit(user)} style={{ marginRight: '0.5rem', background: '#2196f3', color: 'white', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px' }} >Editar</button>
              <button 
                onClick={() => handleDelete(user.id)}
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
