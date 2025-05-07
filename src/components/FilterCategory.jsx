import { ListFilter } from 'lucide-react'
import { useRef, useState } from 'react'
import { CategoryListMobile } from './CategoryListMobile'
import { useHandleClickOutside } from '../hooks/useHandleClickOutside'

export function FilterCategory() {
  const [showFilter, setShowFilter] = useState(false)

  const handleFilter = () => setShowFilter((prev) => !prev)

  const filterRef = useRef()

  useHandleClickOutside(filterRef, () => setShowFilter(false))

  return (
    <div ref={filterRef}>
      <ListFilter
        className={`absolute z-20 cursor-pointer hover:opacity-55 size-9 right-5 top-5 md:top-11 md:size-11 md:fixed md:left-18 transition-all duration-500
          ${showFilter ? 'rotate-0' : 'rotate-180'}
          `}
        onClick={handleFilter}
      />

      <CategoryListMobile
        isAbsolute
        showCategories={showFilter}
        allowSelection={false}
      />
    </div>
  )
}
