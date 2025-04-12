import { ListFilter } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CategoryListMobile } from './CategoryListMobile'

export function FilterCategory() {
  const [showFilter, setShowFilter] = useState(false)

  const handleFilter = () => setShowFilter((prev) => !prev)

  const filterRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showFilter, setShowFilter])

  return (
    <div ref={filterRef}>
      <ListFilter
        className="absolute cursor-pointer  size-9 right-5 top-5 md:hidden"
        onClick={handleFilter}
      />

      <CategoryListMobile isAbsolute showCategories={showFilter} />
    </div>
  )
}
