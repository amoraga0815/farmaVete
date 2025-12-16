import React from 'react';

export default function ProductEditForm({ editingProduct, editForm, setEditForm, handleSaveEdit, handleCancelEdit }) {
  if (!editingProduct) return null;
  return (
    <div className="card shadow-lg p-4" style={{ background: '#fff', borderRadius: 6, boxShadow: '0 1px 6px rgba(0,0,0,0.08)', marginBottom: '2rem', marginTop: '2%', maxWidth: 500, margin: '2% auto 2rem auto' }}>
      <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Editar producto: {editingProduct.id}</h3>
      <form onSubmit={handleSaveEdit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nombre</label>
            <input 
              value={editForm.name} 
              onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))} 
              placeholder="Nombre del producto" 
              className="form-control" 
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Marca</label>
            <input 
              value={editForm.brand} 
              onChange={(e) => setEditForm(f => ({ ...f, brand: e.target.value }))} 
              placeholder="Marca del producto" 
              className="form-control" 
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Precio</label>
            <input 
              value={editForm.price} 
              onChange={(e) => setEditForm(f => ({ ...f, price: e.target.value }))} 
              placeholder="Precio del producto" 
              className="form-control" 
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Stock</label>
            <input
              value={editForm.stock}
              onChange={e => {
                const val = e.target.value;
                setEditForm(f => ({ ...f, stock: val === '' ? '' : Number(val) }));
              }}
              placeholder="Stock del producto"
              className="form-control"
              type="number"
              min={0}
              style={{ width: '100%' }}
            />
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
