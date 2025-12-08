import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toast } from 'bootstrap';

// Asegúrate de tener Bootstrap importado en tu proyecto, por ejemplo en index.html o main.jsx
export default function AddProduct() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (dataNew) => {
    // Crear el objeto usuario
    const user = {
      name: dataNew.descripcion,
      brand: dataNew.marca,
      rating: dataNew.puntuacion,
      price: dataNew.price,
      image: "/products/choiceCan.png"
    };
    try {
      const response = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error("Error al registrar producto");
      }
      const el = document.getElementById('addedToast');
      if (el) new Toast(el).show();
      reset();
    } catch (error) {
      alert(error.message);
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/mantproductos');
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-white" style={{ marginTop: '-80px' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '700px', width: '100%' }}>    
        <h2 className="text-center mb-4 text-primary">Agregar Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Descripcion</label>
            <input
              className="form-control"
              placeholder="Descripcion"
              {...register("descripcion", {
                required: 'La descripcion es requerida',
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
            <input
              className="form-control"
              placeholder="Puntuación"
              {...register("puntuacion", {
                required: 'La puntuación es requerida'
              })}
            />
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
         <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Agregar
          </button>
          <button className="btn btn-secondary w-100 fw-bold" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
       
      </div>


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
  );
}