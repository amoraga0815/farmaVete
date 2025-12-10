
import { useId, useEffect, useState } from 'react'

export default function FiltersSidebar({ state, setState, offcanvasId='offFilters' }){
  const priceFromId = useId()
  const priceToId = useId()

  const toggle = (key, value) => {
    setState(prev => {
      const set = new Set(prev[key])
      set.has(value) ? set.delete(value) : set.add(value)
      return { ...prev, [key]: Array.from(set) }
    })
  }

  return (
    <>
      {/* Panel fijo en desktop */}
      <aside className="shop-filters d-none d-lg-block">
        <FilterContent />
      </aside>

      {/* Offcanvas en móvil */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id={offcanvasId}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Filtrar Por</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <FilterContent />
        </div>
      </div>
    </>
  )

  function FilterContent() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
      fetch('http://localhost:4000/products')
        .then(res => res.json())
        .then(data => {
          // Extraer marcas únicas
          const uniqueBrands = Array.from(new Set(data.map(p => p.brand))).filter(Boolean);
          setBrands(uniqueBrands);
        })
        .catch(() => setBrands([]));
    }, []);

    // Handler para el checkbox 'All'
    const allChecked = brands.length > 0 && brands.every(brand => state.brands?.includes(brand));
    const someChecked = brands.some(brand => state.brands?.includes(brand));

    const handleAllChange = () => {
      if (allChecked) {
        // Deselecciona todas
        toggle('brands', '__all__clear');
        setState(prev => ({ ...prev, brands: [] }));
      } else {
        // Selecciona todas
        setState(prev => ({ ...prev, brands: brands }));
      }
    };

    return (
      <div>
        <h6 className="mb-3">Filtrar Por</h6>

        <div className="mb-3">
          <small className="text-muted d-block mb-1">Marca</small>
          {brands.length === 0 ? (
            <div className="text-muted"></div>
          ) : (
            <>
              <div className="form-check" key="all-brands">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="brand-all"
                  checked={allChecked}
                  indeterminate={someChecked && !allChecked ? 'true' : undefined}
                  onChange={handleAllChange}
                />
                <label className="form-check-label fw-bold" htmlFor="brand-all">Todos</label>
              </div>
              {brands.map(brand => (
                <div className="form-check" key={brand}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={state.brands?.includes(brand) || false}
                    onChange={() => toggle('brands', brand)}
                  />
                  <label className="form-check-label" htmlFor={`brand-${brand}`}>{brand}</label>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}
