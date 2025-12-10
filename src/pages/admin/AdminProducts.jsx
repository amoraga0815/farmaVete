import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'bootstrap';
import { API_URLS } from '../../apiConfig';

function AdminProducts() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const fetchProductos = () => {
    fetch(API_URLS.products)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => console.error('Error fetching productos:', error));
  };

  useEffect(() => {
    fetchProductos();
  }, []);
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', brand: '', price: '', stock: '' });

  const handleEdit = (prod) => {
    setEditingProduct(prod);
    setEditForm({
      name: prod.name || '',
      brand: prod.brand || '',
      price: prod.price || '',
      stock: typeof prod.stock === 'number' ? prod.stock : (prod.stock ? Number(prod.stock) : '')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditForm({ name: '', brand: '', price: '' });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      // Aseguramos que el stock se envíe como number
      const editFormToSend = {
        ...editingProduct,
        ...editForm,
        stock: editForm.stock !== '' ? Number(editForm.stock) : 0
      };
      const response = await fetch(`${API_URLS.products}/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormToSend),
      });
      if (!response.ok) throw new Error('Error al guardar cambios');
     
      const el = document.getElementById('addedToast');
      if (el) new Toast(el).show();

      setEditingProduct(null);
      fetchProductos();
    } catch (error) {
      alert('Error: ' + error.message);
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        const response = await fetch(`${API_URLS.products}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el producto');
        }
        
        const el = document.getElementById('deleteToast');
        if (el) new Toast(el).show();
        
        fetchProductos();
      } catch (error) {
        alert('Error: ' + error.message);
        console.error('Error:', error);
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Productos</h1>
      <button
        style={{ marginBottom: '1rem', background: '#4caf50', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
        onClick={() => navigate('/admin/productos/agregar')}
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

      {editingProduct && (
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
       
      )}

      {/* Toast de confirmación */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="deleteToast" className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              Producto Eliminado Correctamente
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
              Editado Correctamente
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
