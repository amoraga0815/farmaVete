import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'bootstrap';
import { API_URLS } from '../../apiConfig';

function AdminUsers() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const fetchUsuarios = () => {
    fetch(API_URLS.users)
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
      })
      .catch((error) => console.error('Error fetching usuarios:', error));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);
  
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ userName: '', userLastName: '', userEmail: '', userPerfil: '' });

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      userName: user.userName || '',
      userLastName: user.userLastName || '',
      userEmail: user.userEmail || '',
      userPerfil: user.userPerfil || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({ userName: '', userLastName: '', userEmail: '', userPerfil: '' });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    try {

      const editFormToSend = {
        ...editingUser,
        ...editForm
      };
      const response = await fetch(`${API_URLS.users}/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormToSend),
      });
      if (!response.ok) throw new Error('Error al guardar cambios');
     
      const el = document.getElementById('addedToast');
      if (el) new Toast(el).show();

      setEditingUser(null);
      fetchUsuarios();
    } catch (error) {
      alert('Error: ' + error.message);
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        const response = await fetch(`${API_URLS.users}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el usuario');
        }
        
        const el = document.getElementById('deleteToast');
        if (el) new Toast(el).show();
        
        fetchUsuarios();
      } catch (error) {
        alert('Error: ' + error.message);
        console.error('Error:', error);
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Usuarios</h1>
      <button
        style={{ marginBottom: '1rem', background: '#4caf50', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
        onClick={() => navigate('/admin/usuarios/agregar')}
      >
        Agregar Usuario
      </button>
     
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

      {editingUser && (
        <div className="card shadow-lg p-4" style={{ background: '#fff', borderRadius: 6, boxShadow: '0 1px 6px rgba(0,0,0,0.08)', marginBottom: '2rem', marginTop: '2%', maxWidth: 500, margin: '2% auto 2rem auto' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Editar usuario: {editingUser.id}</h3>
          <form onSubmit={handleSaveEdit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nombre</label>
                <input 
                  value={editForm.userName} 
                  onChange={(e) => setEditForm(f => ({ ...f, userName: e.target.value }))} 
                  placeholder="Nombre de usuario" 
                  className="form-control" 
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Apellido</label>
                <input 
                  value={editForm.userLastName} 
                  onChange={(e) => setEditForm(f => ({ ...f, userLastName: e.target.value }))} 
                  placeholder="Apellido de usuario" 
                  className="form-control" 
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
                <input 
                  value={editForm.userEmail} 
                  onChange={(e) => setEditForm(f => ({ ...f, userEmail: e.target.value }))} 
                  placeholder="Email de usuario" 
                  className="form-control" 
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Perfil</label>
                <select
                  value={editForm.userPerfil}
                  onChange={e => setEditForm(f => ({ ...f, userPerfil: e.target.value }))}
                  className="form-select"
                  style={{ width: '100%' }}
                >
                  <option value="">Seleccionar Perfil</option>
                  <option value="Admin">Admin</option>
                  <option value="cliente">Cliente</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancelar</button>
              </div>
            </div>
          </form>
        </div>
       
      )}

      {/* Toast de confirmación */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="deleteToast" className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              Usuario Eliminado Correctamente
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>

      {/* Toast de confirmación */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="addedToast" className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              Usuario Editado Correctamente
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
