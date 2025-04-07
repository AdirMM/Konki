import { createContext, useState, useEffect, useContext } from 'react'

const CategoryContext = createContext()

export function CategoryProvider({ children }) {
  const storedCategories = JSON.parse(localStorage.getItem('categories')) || [
    { name: 'Hogar', color: '#3b82f6', icon: 'House' }, // Azul
    { name: 'Trabajo', color: '#22c55e', icon: 'BriefcaseBusiness' }, // Verde
    { name: 'Estudio', color: '#ef4444', icon: 'GraduationCap' }, // Rojo
  ] // Ahora es un estado
  const [categories, setCategories] = useState(storedCategories)
  const [category, setCategory] = useState(
    storedCategories[0] || { name: '', color: '#3b82f6' }
  ) // ✅ Valor inicial seguro

  // Guardar en localstorage cuando categories cambien
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

  const addCategory = (name, color, iconName) => {
    if (
      name.trim() !== '' &&
      !categories.some((cat) => cat.name.toLowerCase() === name.toLowerCase())
    ) {
      const newCategories = [...categories, { name, color, icon: iconName }] // Guardamos solo el nombre
      setCategories(newCategories)
      localStorage.setItem('categories', JSON.stringify(newCategories))
    }
  }

  const updateCategory = (id, name, color, icon) => {
    const updatedCategories = categories.map((cat) =>
      cat.name === id ? { name, color, icon } : cat
    )

    setCategories(updatedCategories)

    localStorage.setItem('categories', JSON.stringify(updatedCategories))
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
