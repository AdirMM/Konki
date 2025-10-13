import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const defaultCategories = [
  { name: 'Todas', color: '#9ca3af', iconName: 'list' },
  { name: 'Hogar', color: '#3b82f6', iconName: 'home' },
  { name: 'Trabajo', color: '#22c55e', iconName: 'briefcase' },
  { name: 'Estudio', color: '#ef4444', iconName: 'book' },
  { name: 'Compras', color: '#f59e0b', iconName: 'shopping-cart' },
]

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(defaultCategories)
  const [category, setCategory] = useState(defaultCategories[0])

  // ✅ Cargar categorías de AsyncStorage al iniciar la app
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const storedCategories = await AsyncStorage.getItem('@categories')
        if (storedCategories) {
          const parsed = JSON.parse(storedCategories)
          setCategories(parsed)
          setCategory(parsed[0] || null)
        }
      } catch (error) {
        console.log('Error loading categories', error)
      }
    }
    loadCategories()
  }, [])

  // ✅ Guardar categorías automáticamente cada vez que cambian
  useEffect(() => {
    const saveCategories = async () => {
      try {
        await AsyncStorage.setItem('@categories', JSON.stringify(categories))
      } catch (error) {
        console.log('Error saving categories', error)
      }
    }
    saveCategories()
  }, [categories])

  const addCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory])
  }

  const updateCategory = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.name === updatedCategory.name ? updatedCategory : cat
      )
    )
  }

  const deleteCategory = (name) => {
    const updatedCategories = categories.filter((cat) => cat.name !== name)
    setCategories(updatedCategories)
    if (category.name === name) {
      setCategory(updatedCategories[0] || null)
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
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategoryContext = () => useContext(CategoryContext)
