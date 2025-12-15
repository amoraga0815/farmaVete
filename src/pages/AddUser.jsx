import React from "react";
import { useForm } from "react-hook-form";
//import { useNavigate } from "react-router-dom";
import { Toast } from 'bootstrap';
import { API_URLS } from '../apiConfig';

export default function AddUser() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  //const navigate = useNavigate();

  const onSubmit = async (dataNew) => {
    const user = {
      userName: dataNew.userName,
      userLastName: dataNew.userLastName,
      userEmail: dataNew.userEmail,
      userPerfil: dataNew.userPerfil,
      Password: dataNew.password
    };
    try {
      const response = await fetch(API_URLS.users, {
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
    } catch (error) {
      alert(error.message);
    }
  }


  return (

      <div className="container-fluid d-flex align-items-center justify-content-center bg-white">
      <div className="card shadow-lg p-4" style={{ maxWidth: '700px', width: '100%' }}>    
        <h2 className="text-center mb-4 text-primary">Agregar Usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              placeholder="Nombre"
              {...register("userName", {
                required: 'El nombre es requerido',
              })}
            />
            {errors.userName && <div className="text-danger small mt-1">{errors.userName.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              className="form-control"
              placeholder="Apellido"
              {...register("userLastName", {
                required: 'El apellido es requerido',
              })}
            />
            {errors.userLastName && <div className="text-danger small mt-1">{errors.userLastName.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              placeholder="Email"
              {...register("userEmail", {
                required: 'El email es requerido',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Ingrese un email válido',
                }
              })}
            />
            {errors.userEmail && <div className="text-danger small mt-1">{errors.userEmail.message}</div>}
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
            <label className="form-label">Perfil</label>
            <select
                  className="form-select"
                  style={{ width: '100%' }}
                  {...register("userPerfil", {
                    required: 'El perfil es requerido',
                  })}
                >
                  <option value="">Seleccionar Perfil</option>
                  <option value="Admin">Admin</option>
                  <option value="Cliente">Cliente</option>
                </select>
            {errors.userPerfil && <div className="text-danger small mt-1">{errors.userPerfil.message}</div>}
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
              Usuario Agregado Correctamente
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>

</div>
    </div>
  );
}