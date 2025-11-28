
import React from "react";
import { useForm } from "react-hook-form";
import { useDataContext } from "../data/DataContext";


export default function Login() {
	const { setUser } = useDataContext();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		// Guarda usuario y contraseña en el contexto
    setUser({ username: data.username, password: data.password });
	};

	return (
		<div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-white">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
      </div>
    </div>
	);
}
