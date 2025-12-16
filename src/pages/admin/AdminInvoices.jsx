

import React, { useEffect, useState } from 'react';
import { API_URLS } from '../../apiConfig';
import InvoicesStats from './components/admininvoices/InvoicesStats';
import InvoicesSalesByMonth from './components/admininvoices/InvoicesSalesByMonth';
import InvoicesTable from './components/admininvoices/InvoicesTable';


export default function AdminInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userFilter, setUserFilter] = useState('');
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch facturas
        const resFact = await fetch(API_URLS.listCar);
        if (!resFact.ok) throw new Error('Error al obtener facturas');
        const dataFact = await resFact.json();
        const pagadas = dataFact.filter(f => f.paid);
        setInvoices(pagadas);

        // Fetch usuarios
        const resUsers = await fetch(API_URLS.users);
        if (!resUsers.ok) throw new Error('Error al obtener usuarios');
        const dataUsers = await resUsers.json();
        setUsers(dataUsers);

        // Calcular ventas por mes
        const ventasMes = {};
        pagadas.forEach(f => {
          let fecha = null;
          if (f.fecha) {
            fecha = new Date(f.fecha);
          } else if (f.facturaNum) {
            const parts = f.facturaNum.split('-');
            if (parts.length === 3 && !isNaN(Number(parts[2]))) {
              fecha = new Date(Number(parts[2]));
            }
          }
          if (fecha) {
            const mes = fecha.toLocaleString('es-CL', { month: 'short', year: 'numeric' });
            ventasMes[mes] = (ventasMes[mes] || 0) + (f.total || 0);
          }
        });
        const ventasMesArr = Object.entries(ventasMes).map(([mes, total]) => ({ mes, total }));
        ventasMesArr.sort((a, b) => {
          const [mA, yA] = a.mes.split(' ');
          const [mB, yB] = b.mes.split(' ');
          const dateA = new Date(`${mA} 1, ${yA}`);
          const dateB = new Date(`${mB} 1, ${yB}`);
          return dateA - dateB;
        });
        setVentasPorMes(ventasMesArr);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  // Filtrado por usuario
  const filteredInvoices = userFilter
    ? invoices.filter(f => String(f.userId).toLowerCase().includes(userFilter.toLowerCase()))
    : invoices;

  // Helper para obtener nombre completo del usuario
  const getUserName = (userId) => {
    const user = users.find(u => String(u.id) === String(userId));
    return user ? `${user.userName} ${user.userLastName}` : '-';
  };

  // Estadísticas
  const totalFacturas = filteredInvoices.length;
  const totalVentas = filteredInvoices.reduce((acc, f) => acc + (f.total || 0), 0);
  const productosVendidos = filteredInvoices.reduce((acc, f) => acc + (Array.isArray(f.products) ? f.products.reduce((a, p) => a + (p.qty || 0), 0) : 0), 0);

  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <i className="bi bi-receipt display-4 text-warning mb-2"></i>
        <h2 className="fw-bold">Dashboard de Facturas</h2>
        <p className="text-muted">Visualiza y gestiona todas las facturas generadas en el sistema.</p>
      </div>

      {/* Estadísticas */}
      <InvoicesStats totalVentas={totalVentas} totalFacturas={totalFacturas} productosVendidos={productosVendidos} />

      {/* Estadística de ventas por mes */}
      <InvoicesSalesByMonth ventasPorMes={ventasPorMes} />

      {/* Filtro por usuario */}
      <div className="row mb-3 justify-content-end">
        <div className="col-md-4 col-sm-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por ID de usuario..."
            value={userFilter}
            onChange={e => setUserFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla de facturas */}
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white fw-bold fs-5">
          Todas las Facturas
        </div>
        <InvoicesTable loading={loading} error={error} filteredInvoices={filteredInvoices} getUserName={getUserName} />
      </div>
    </div>
  );
}
