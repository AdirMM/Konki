import React, { createContext, useState, useContext } from "react";
import { useTaskContext } from "./TaskContext";
const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTop, setIsTop] = useState(true); // Puedes actualizarlo desde un ScrollView si lo necesitas

  const { tasks } = useTaskContext();

  const drawingsExists = Array.isArray(tasks) && tasks.length === 0;
  const firstTask = Array.isArray(tasks) && tasks.length === 1;
  const secondTask = Array.isArray(tasks) && tasks.length === 2;

  const [modals, setModals] = useState({
    addTask: { isOpen: false, isAnimating: false },
    editTask: { isOpen: false, isAnimating: false },
    category: { isOpen: false, isAnimating: false },
    categories: { isOpen: false, isAnimating: false },
    message: { isOpen: false, isAnimating: false },
  });

  const toggleModal = (name) => {
    setModals((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        isOpen: !prev[name]?.isOpen,
      },
    }));
  };

  const switchModal = (from, to) => {
    setModals((prev) => ({
      ...prev,
      [from]: { isOpen: false, isAnimating: true },
      [to]: { isOpen: true, isAnimating: false },
    }));
  };

  return (
    <UIContext.Provider
      value={{
        modals,
        setModals,
        toggleModal,

        selectedCategory,
        setSelectedCategory,
        isTop,
        setIsTop, // Útil si quieres usar onScroll en una ScrollView
        drawingsExists,
        firstTask,
        secondTask,
        switchModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUIContext() {
  return useContext(UIContext);
}
