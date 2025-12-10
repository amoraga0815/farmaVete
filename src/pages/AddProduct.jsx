import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toast } from 'bootstrap';

// Asegúrate de tener Bootstrap importado en tu proyecto, por ejemplo en index.html o main.jsx
export default function AddProduct() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [imageBase64, setImageBase64] = useState("");

  const onSubmit = async (dataNew) => {
    // Crear el objeto producto
    const product = {
      name: dataNew.descripcion,
      brand: dataNew.marca,
      rating: dataNew.puntuacion,
      price: dataNew.price,
      stock: parseInt(dataNew.stock, 10),
      image: imageBase64 || "/products/choiceCan.png"
    };
    try {
      const response = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      if (!response.ok) {
        throw new Error("Error al registrar producto");
      }
      const el = document.getElementById('addedToast');
      if (el) new Toast(el).show();
      reset();
      setImageBase64("");
    } catch (error) {
      alert(error.message);
    }
  }
  // Manejar cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (

      <div className="container-fluid d-flex align-items-center justify-content-center bg-white">
      <div className="card shadow-lg p-4" style={{ maxWidth: '700px', width: '100%' }}>    
        <h2 className="text-center mb-4 text-primary">Agregar Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Imagen del producto</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imageBase64 && (
              <div className="mt-2 text-center">
                <img src={imageBase64} alt="preview" style={{maxWidth:120, maxHeight:120, borderRadius:8, border:'1px solid #eee'}} />
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              className="form-control"
              placeholder="Description"
              {...register("descripcion", {
                required: 'La descripción es requerida',
              })}
            />
            {errors.descripcion && <div className="text-danger small mt-1">{errors.descripcion.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Marca</label>
            <input
              className="form-control"
              placeholder="Marca"
              {...register("marca", {
                required: 'La marca es requerida',
              })}
            />
            {errors.marca && <div className="text-danger small mt-1">{errors.marca.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Puntuación</label>
            <select
              className="form-select"
              defaultValue=""
              {...register("puntuacion", {
                required: 'La puntuación es requerida',
              })}
            >
              <option value="" disabled>Selecciona estrellas</option>
              <option value="1">★</option>
              <option value="2">★★</option>
              <option value="3">★★★</option>
              <option value="4">★★★★</option>
              <option value="5">★★★★★</option>
            </select>
            {errors.puntuacion && <div className="text-danger small mt-1">{errors.puntuacion.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
              className="form-control"
              placeholder="Precio"
              type="number"
              {...register("price", {
                required: 'El precio es requerido',
                minLength: {
                  value: 3,
                  message: 'El precio debe tener al menos 3 caracteres',
                },  
              })}
            />
            {errors.price && <div className="text-danger small mt-1">{errors.price.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              className="form-control"
              placeholder="Stock"
              type="number"
              min={0}
              {...register("stock", {
                required: 'El stock es requerido',
                min: { value: 0, message: 'El stock no puede ser negativo' },
              })}
            />
            {errors.stock && <div className="text-danger small mt-1">{errors.stock.message}</div>}
          </div>
         <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Agregar
          </button>
 
          </div>
        </form>
       


              {/* Toast de confirmación */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="addedToast" className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              Producto Agregado Correctamente
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>

</div>
    </div>
  );
}
