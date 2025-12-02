import React from "react";
import { useForm } from "react-hook-form";
// Asegúrate de tener Bootstrap importado en tu proyecto, por ejemplo en index.html o main.jsx
export default function Registro() {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
 
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
      alert("Usuario agregado correctamente");
      reset();
    } catch (error) {
      alert(error.message);
    }
  }
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
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Registrarse
          </button>
        </form>
       
      </div>
    </div>
  );
}