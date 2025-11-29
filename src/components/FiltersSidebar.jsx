
import { useId } from 'react'

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

  function FilterContent(){
    return (
      <div>
        <h6 className="mb-3">Filtrar Por</h6>

        <div className="mb-3">
          <small className="text-muted d-block mb-1">Marca</small>
          {['QPets','Ancare','Bravecto','Credelio','EasyGroom','Grizzly','Himalaya'].map(brand=>(
            <div className="form-check" key={brand}>
              <input className="form-check-input" type="checkbox" id={`brand-${brand}`} onChange={()=>toggle('brands', brand)} />
              <label className="form-check-label" htmlFor={`brand-${brand}`}>{brand}</label>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
