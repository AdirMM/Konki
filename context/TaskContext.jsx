import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCategoryContext } from "./CategoryContext";
import uuid from "react-native-uuid";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const { category, categories } = useCategoryContext();

  const hasCompletedTasks = tasks.some((task) => task.completed);

  // Migrar tareas que tenían categorías antiguas a "Todas"
  useEffect(() => {
    const migrateTasks = async () => {
      try {
        const migratedFlag = await AsyncStorage.getItem(
          "@migratedOldDefaultsTasks"
        );
        if (migratedFlag === "true") return;

        const savedTasks = await AsyncStorage.getItem("tasks");
        if (!savedTasks) return;

        const parsed = JSON.parse(savedTasks);
        const oldDefaultNames = ["Hogar", "Trabajo", "Estudio", "Compras"];
        const todasCategory = categories.find((c) => c.name === "Todas");

        const migratedTasks = parsed.map((t) =>
          oldDefaultNames.includes(t.category?.name)
            ? { ...t, category: todasCategory }
            : t
        );

        setTasks(migratedTasks);
        await AsyncStorage.setItem("tasks", JSON.stringify(migratedTasks));
        await AsyncStorage.setItem("@migratedOldDefaultsTasks", "true");
      } catch (error) {
        console.log("Error migrando tareas antiguas:", error);
      }
    };

    migrateTasks();
  }, [categories]);

  const addTask = async (text, selectedCategory = category) => {
    if (!text.trim()) return;

    const { id, name, iconName, color } = selectedCategory;

    const newTask = {
      id: uuid.v4(),
      text: text.trim(),
      category: { id, name, iconName, color },
      completed: false,
      createdAt: Date.now(),
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error guardando tareas:", error);
    }
  };

  const editTask = async (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleCompleted = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const removeTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    if (updatedTasks.length === 0) {
      await AsyncStorage.removeItem("tasks");
    } else {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const deleteCompletedTask = async () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Cargar tareas al iniciar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        if (savedTasks) {
          const parsed = JSON.parse(savedTasks);
          const normalized = parsed.map((t) => ({
            ...t,
            createdAt: t.createdAt || t.createAt || Date.now(),
          }));
          setTasks(normalized);
          await AsyncStorage.setItem("tasks", JSON.stringify(normalized));
        }
      } catch (error) {
        console.warn("Error cargando tareas:", error);
      }
    };
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        addTask,
        removeTask,
        editTask,
        taskInput,
        setTaskInput,
        selectedTask,
        setSelectedTask,
        toggleCompleted,
        tasks,
        setTasks,
        deleteCompletedTask,
        hasCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
