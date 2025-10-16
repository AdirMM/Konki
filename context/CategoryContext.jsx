import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

const defaultCategories = [
  { id: uuid.v4(), name: 'Todas', color: '#9ca3af', iconName: 'list' },
  { id: uuid.v4(), name: 'Hogar', color: '#3b82f6', iconName: 'home' },
  { id: uuid.v4(), name: 'Trabajo', color: '#22c55e', iconName: 'briefcase' },
  { id: uuid.v4(), name: 'Estudio', color: '#ef4444', iconName: 'book' },
  {
    id: uuid.v4(),
    name: 'Compras',
    color: '#f59e0b',
    iconName: 'shopping-cart',
  },
]
const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(defaultCategories)
  const [category, setCategory] = useState(defaultCategories[0])
  const [maxCategories, setMaxCategories] = useState(15)

  // ✅ Cargar categorías desde AsyncStorage
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const stored = await AsyncStorage.getItem('@categories')
        if (stored) {
          const parsed = JSON.parse(stored)
          setCategories(parsed)
          setCategory(parsed[0] || null)
        }
      } catch (error) {
        console.log('Error al cargar categorías:', error)
      }
    }
    loadCategories()
  }, [])

  // ✅ Guardar automáticamente cada vez que cambian
  useEffect(() => {
    const saveCategories = async () => {
      try {
        await AsyncStorage.setItem('@categories', JSON.stringify(categories))
      } catch (error) {
        console.log('Error al guardar categorías:', error)
      }
    }
    saveCategories()
  }, [categories])

  // ➕ Agregar categoría con límite de 16
  const addCategory = (newCategory) => {
    if (categories.length >= maxCategories) {
      console.warn(
        `No se puede agregar más categorías. Límite máximo: ${maxCategories}`
      )
      return
    }
    const categoryWithId = { id: uuid.v4(), ...newCategory }
    setCategories((prev) => [...prev, categoryWithId])
  }

  // ✏️ Actualizar categoría
  const updateCategory = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
    )
  }

  // ❌ Eliminar categoría
  const deleteCategory = (id) => {
    const updated = categories.filter((cat) => cat.id !== id)
    setCategories(updated)
    if (category?.id === id) {
      setCategory(updated[0] || null)
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        category,
        setCategory,
        addCategory,
        updateCategory,
        deleteCategory,
        maxCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategoryContext = () => useContext(CategoryContext)
