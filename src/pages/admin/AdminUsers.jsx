
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'bootstrap';
import { API_URLS } from '../../apiConfig';
import UsersTable from './components/adminusers/UsersTable';
import UserEditForm from './components/adminusers/UserEditForm';
import { DeleteToast, EditToast } from './components/adminusers/UserToasts';

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
     
      <UsersTable usuarios={usuarios} handleEdit={handleEdit} handleDelete={handleDelete} />

      <UserEditForm editingUser={editingUser} editForm={editForm} setEditForm={setEditForm} handleSaveEdit={handleSaveEdit} handleCancelEdit={handleCancelEdit} />

      <DeleteToast />
      <EditToast />
    </div>
  );
}

export default AdminUsers;
