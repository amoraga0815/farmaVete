
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="mb-3">Bienvenido a la Farmacía Veterinaria Luns & Ernesto</h1>
      <p className="text-muted mb-4">Explora nuestros productos para tus mascotas.</p>
      <Link className="btn btn-primary" to="/tienda">Ir a la Tienda</Link>
    </div>
  )
}
