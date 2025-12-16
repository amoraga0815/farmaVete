
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'bootstrap';
import { API_URLS } from '../../apiConfig';
import ProductsTable from './components/adminproducts/ProductsTable';
import ProductEditForm from './components/adminproducts/ProductEditForm';
import { DeleteToast, EditToast } from './components/adminproducts/ProductToasts';

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
     
      <ProductsTable productos={productos} handleEdit={handleEdit} handleDelete={handleDelete} />

      <ProductEditForm editingProduct={editingProduct} editForm={editForm} setEditForm={setEditForm} handleSaveEdit={handleSaveEdit} handleCancelEdit={handleCancelEdit} />

      <DeleteToast />
      <EditToast />
    </div>
  );
}

export default AdminProducts;
