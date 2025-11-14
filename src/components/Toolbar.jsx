
export default function Toolbar({ total, sort, setSort, onOpenFilters }){
  return (
    <div className="shop-toolbar d-flex flex-wrap align-items-center justify-content-between gap-2">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-secondary d-lg-none" onClick={onOpenFilters}>
          <i className="bi bi-sliders"></i> Filtros
        </button>
        <span className="text-muted">{total} Productos</span>
      </div>

      <div className="d-flex align-items-center gap-2">
        <div className="btn-group" role="group" aria-label="Cambiar vista">
          <button className="btn btn-outline-secondary"><i className="bi bi-grid-3x3-gap"></i></button>
          <button className="btn btn-outline-secondary"><i className="bi bi-grid"></i></button>
          <button className="btn btn-outline-secondary"><i className="bi bi-list"></i></button>
        </div>

        <div className="dropdown">
          <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
            {sort === 'az' ? 'Alfabéticamente, A–Z' : 'Precio, menor a mayor'}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><button className="dropdown-item" onClick={() => setSort('az')}>Alfabéticamente, A–Z</button></li>
            <li><button className="dropdown-item" onClick={() => setSort('priceAsc')}>Precio, menor a mayor</button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
