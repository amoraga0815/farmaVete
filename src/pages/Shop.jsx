

import { useEffect, useMemo, useRef, useState } from 'react'
import { Offcanvas } from 'bootstrap'   // ⬅️ Importa el componente
import productsData from '../data/products.js'
import Toolbar from '../components/Toolbar.jsx'
import FiltersSidebar from '../components/FiltersSidebar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'

export default function Shop(){
  const [sort, setSort] = useState('az')
  const [filters, setFilters] = useState({
    availability: [],
    brands: [],
    priceFrom: '',
    priceTo: ''
  })

  const offId = 'offFilters'
  const offInstance = useRef(null)

  useEffect(()=> {
    const el = document.getElementById(offId)
    if (el && !offInstance.current) {
      // ⬅️ Usa la clase importada
      offInstance.current = new Offcanvas(el)
    }
    // Limpieza al desmontar
    return () => {
      try { offInstance.current?.hide() } catch {}
      offInstance.current = null
    }
  }, [])

  const filtered = useMemo(()=>{
    let list = [...productsData]
    if (filters.brands.length){
      list = list.filter(p => filters.brands.includes(p.brand))
    }
    const from = parseInt(filters.priceFrom || 0, 10)
    const to = parseInt(filters.priceTo || Number.MAX_SAFE_INTEGER, 10)
    list = list.filter(p => {
      const price = p.price ?? p.fromPrice ?? 0
      return price >= from && price <= to
    })
    if (sort === 'az'){
      list.sort((a,b)=> a.name.localeCompare(b.name, 'es'))
    } else if (sort === 'priceAsc'){
      list.sort((a,b)=> (a.price ?? a.fromPrice ?? 0) - (b.price ?? b.fromPrice ?? 0))
    }
    return list
  }, [sort, filters])

  return (
    <section className="shop-grid container-fluid">
      <div className="shop-toolbar">
        <Toolbar 
          total={filtered.length}
          sort={sort}
          setSort={setSort}
          onOpenFilters={() => offInstance.current?.show()}  // ⬅️ Llama a show() del Offcanvas
        />
      </div>

      <FiltersSidebar state={filters} setState={setFilters} offcanvasId={offId} />

      <div className="shop-products">
        <ProductGrid products={filtered} />
      </div>
    </section>
  )
}

