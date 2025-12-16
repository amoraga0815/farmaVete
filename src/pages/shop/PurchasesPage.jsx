
import { useEffect, useState } from 'react';
import { useDataContext } from '../../data/DataContext';
import { API_URLS } from '../../apiConfig';
import PurchasesTable from './components/purchases/PurchasesTable';
import PurchasesEmpty from './components/purchases/PurchasesEmpty';
import PurchasesLoginAlert from './components/purchases/PurchasesLoginAlert';

export default function PurchasesPage() {
  const { user } = useDataContext();
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(`${API_URLS.listCar}?userId=${user.id}&paid=true`)
        .then(res => res.json())
        .then(data => {
          setFacturas(data.filter(f => f.facturaNum));
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) {
    return <PurchasesLoginAlert />;
  }

  return (
    <div className="container py-5">
      <div className="mb-4 text-center">
        <h2 className="fw-bold text-primary mb-1"><i className="bi bi-receipt-cutoff me-2"></i>Mis Compras</h2>
        <div className="text-muted">Historial de facturas asociadas a tu cuenta</div>
      </div>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : facturas.length === 0 ? (
        <PurchasesEmpty />
      ) : (
        <PurchasesTable facturas={facturas} />
      )}
    </div>
  );
}
