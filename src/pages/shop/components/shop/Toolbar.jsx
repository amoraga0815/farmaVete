
export default function Toolbar({ total, sort, setSort, onOpenFilters }){
  return (
    <div className="shop-toolbar d-flex flex-wrap align-items-center justify-content-between gap-2">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-secondary d-lg-none" onClick={onOpenFilters}>
          <i className="bi bi-sliders"></i> Filtros
        </button>
        <span className="text-muted">{total} Productos</span>
      </div>
    </div>
  )
}
