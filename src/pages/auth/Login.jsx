import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataContext } from "../../data/DataContext";
import { API_URLS } from "../../apiConfig";

export default function Login() {
  const { setUser } = useDataContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  

const onSubmit = async ({ username, password }) => {
  setLoginError("");
  try {
    const params = new URLSearchParams({
      userName: username.trim(),   
      Password: password.trim(),   
    });

    const res = await fetch(`${API_URLS.users}?${params.toString()}`);
    if (!res.ok) throw new Error("No se pudo obtener usuarios");

    const usuarios = await res.json();
    const usuario = usuarios[0]; 

    if (usuario) {
      setUser(usuario);
      navigate("/");
    } else {
      setLoginError("Usuario y/o contraseña no coinciden");
    }
  } catch (err) {
    console.error(err);
    setLoginError("Error al validar usuario");
  }
};

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-white">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginError && <div className="alert alert-danger py-2 small">{loginError}</div>}
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              className="form-control"
              placeholder="Usuario"
              {...register("username", {
                required: 'El usuario es requerido',
                minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                maxLength: { value: 20, message: 'Máximo 20 caracteres' },
              })}
            />
            {errors.username && <div className="text-danger small mt-1">{errors.username.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              className="form-control"
              placeholder="Contraseña"
              type="password"
              {...register("password", {
                required: 'La contraseña es requerida',
                minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                maxLength: { value: 40, message: 'Máximo 40 caracteres' },
              })}
            />
            {errors.password && <div className="text-danger small mt-1">{errors.password.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Ingresar
          </button>
        </form>
        <div className="text-center mt-3">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro">Regístrese aquí</Link>
        </div>
      </div>
    </div>
  );
}
