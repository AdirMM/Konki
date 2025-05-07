import { createContext, useState, useEffect, useContext } from 'react'

const CategoryContext = createContext()

export function CategoryProvider({ children }) {
  const defaultCategories = [
    { name: 'Todas', color: '#000000', icon: 'GalleryVerticalEnd' },
    { name: 'Hogar', color: '#3b82f6', icon: 'House' },
    { name: 'Trabajo', color: '#22c55e', icon: 'BriefcaseBusiness' },
    { name: 'Estudio', color: '#ef4444', icon: 'GraduationCap' },
  ]
  const [category, setCategory] = useState(defaultCategories[0]) // 'Todas'

  const storedCategories =
    JSON.parse(localStorage.getItem('categories')) || defaultCategories
  const [categories, setCategories] = useState(storedCategories)

  // Guardar en localstorage cuando categories cambien
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

  const addCategory = (name, color, iconName) => {
    if (
      name.trim() !== '' &&
      !categories.some((cat) => cat.name.toLowerCase() === name.toLowerCase())
    ) {
      const newCategory = { name, color, icon: iconName }
      const newCategories = [...categories, newCategory]
      setCategories(newCategories)
      setCategory(newCategory) // ⬅️ Esta línea es la "opción 1"
      localStorage.setItem('categories', JSON.stringify(newCategories))
    }
  }

  const updateCategory = (prevName, newName, newColor, newIcon) => {
    const updatedCategories = categories.map((cat) =>
      cat.name === prevName
        ? { name: newName, color: newColor, icon: newIcon }
        : cat
    )

    setCategories(updatedCategories)
    localStorage.setItem('categories', JSON.stringify(updatedCategories))

    // 🔥 Verificamos si la categoría seleccionada es la que se acaba de editar
    if (category?.name === prevName) {
      setCategory({ name: newName, color: newColor, icon: newIcon })
    }
  }

  const deleteCategory = (categoryName) => {
    const filteredCategories = categories.filter(
      (cat) => cat.name !== categoryName
    )
    setCategories(filteredCategories)
    localStorage.setItem('categories', JSON.stringify(filteredCategories))
  }

  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
        categories,
        setCategories,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategoryContext() {
  return useContext(CategoryContext)
}
