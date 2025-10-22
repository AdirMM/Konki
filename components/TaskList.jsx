import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useTaskContext } from "../context/TaskContext";
import { useUIContext } from "../context/UIContext";
import { useCategoryContext } from "../context/CategoryContext";
import { TaskGroup } from "./TaskGroup";
import { EmptyState } from "./EmptyState";

export function TaskList() {
  const { tasks, toggleCompleted, setSelectedTask } = useTaskContext();
  const { toggleModal } = useUIContext();
  const { category } = useCategoryContext();

  const [recentlyCompleted, setRecentlyCompleted] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasMounted(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const clickTimeoutRef = useRef(null);
  const recentlyCompletedTimeout = useRef(null);

  const isAllCategory = category.name.toLowerCase().trim() === "todas";

  // Filtrado solo por categoría, sin ocultar tareas completadas
  const filteredTasks = isAllCategory
    ? tasks
    : tasks.filter(
        (task) =>
          task.category?.name?.toLowerCase().trim() ===
          category.name.toLowerCase().trim()
      );

  const handleToggleCompleted = (task) => {
    const isAlreadyCompleted = task.completed;
    toggleCompleted(task.id);

    if (recentlyCompleted?.id === task.id && isAlreadyCompleted) {
      clearTimeout(recentlyCompletedTimeout.current);
      setRecentlyCompleted(null);
      return;
    }

    if (!isAlreadyCompleted) {
      setRecentlyCompleted({
        id: task.id,
        text: task.text.slice(0, 25),
      });

      recentlyCompletedTimeout.current = setTimeout(() => {
        setRecentlyCompleted(null);
      }, 2000);
    }
  };

  const getRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInTime = now - date;
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    if (diffInDays === 0) return "Hoy";
    if (diffInDays === 1) return "Ayer";
    return `Hace ${diffInDays} días`;
  };

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    const relativeDate = getRelativeDate(task.createAt);
    if (!acc[relativeDate]) acc[relativeDate] = [];
    acc[relativeDate].push(task);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <EmptyState src="nothing" />
      ) : filteredTasks.length === 0 ? (
        <EmptyState src="no-tasks" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.taskList}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(groupedTasks).map(([relativeDate, tasks]) => (
            <TaskGroup
              key={relativeDate}
              relativeDate={relativeDate}
              tasks={tasks}
              handleToggleCompleted={handleToggleCompleted}
              setSelectedTask={setSelectedTask}
              toggleModal={toggleModal}
              clickTimeoutRef={clickTimeoutRef}
              hasMounted={hasMounted}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  taskList: {
    paddingBottom: 180,
  },
});
