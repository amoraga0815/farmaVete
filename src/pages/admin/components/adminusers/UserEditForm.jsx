import React from 'react';

export default function UserEditForm({ editingUser, editForm, setEditForm, handleSaveEdit, handleCancelEdit }) {
  if (!editingUser) return null;
  return (
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
  );
}
