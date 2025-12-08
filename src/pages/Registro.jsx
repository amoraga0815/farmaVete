import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toast } from 'bootstrap';
// Asegúrate de tener Bootstrap importado en tu proyecto, por ejemplo en index.html o main.jsx
export default function Registro() {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const password = watch("password", "");
  const onSubmit = async (dataNew) => {
    // Crear el objeto usuario
    const user = {
      nombre: dataNew.nombre,
      apellido: dataNew.apellido,
      email: dataNew.email,
      password: dataNew.password
    };
    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }
      const el = document.getElementById('addedToast');
      if (el) new Toast(el).show();
      reset();
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      alert(error.message);
    }
  }
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/login');
  };
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-white">
      <div className="card shadow-lg p-4" style={{ maxWidth: '700px', width: '100%' }}>    
        <h2 className="text-center mb-4 text-primary">Registro</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              placeholder="Nombre"
              {...register("nombre", {
                required: 'El nombre es requerido',
              })}
            />
            {errors.nombre && <div className="text-danger small mt-1">{errors.nombre.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              className="form-control"
              placeholder="Apellido"
              {...register("apellido", {
                required: 'El apellido es requerido',
              })}
            />
            {errors.apellido && <div className="text-danger small mt-1">{errors.apellido.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              placeholder="Email"
              {...register("email", {
                required: 'El email es requerido',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Ingrese un email válido',
                },
              })}
            />
            {errors.email && <div className="text-danger small mt-1">{errors.email.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              className="form-control"
              placeholder="Contraseña"
              type="password"
              {...register("password", {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },  
              })}
            />
            {errors.password && <div className="text-danger small mt-1">{errors.password.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmar Contraseña</label>
            <input
              className="form-control"
              placeholder="Confirmar Contraseña"
              type="password"
              {...register("confirmPassword", {
                required: 'La confirmación de la contraseña es requerida',
                validate: value =>
                  value === password || 'Las contraseñas no coinciden',
              })}
            />
            {errors.confirmPassword && <div className="text-danger small mt-1">{errors.confirmPassword.message}</div>}
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Registrarse
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
              Registrado Correctamente
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>

    </div>
    
  );
}