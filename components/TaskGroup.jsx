import { useEffect, useRef, useMemo } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { TaskItem } from "./TaskItem";

// 🔧 Calcula la diferencia en días (UTC, seguro)
function daysDiffFromToday(dateInput) {
  const d = dateInput instanceof Date ? dateInput : new Date(Number(dateInput));
  const utcDate = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const now = new Date();
  const utcToday = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const diffMs = utcDate - utcToday;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

// 🔧 Devuelve texto relativo ("Hoy", "Ayer", "Antier", o "12 Oct")
function getRelativeLabel(dateInput) {
  const diff = daysDiffFromToday(dateInput);
  if (diff === 0) return "Hoy";
  if (diff === -1) return "Ayer";
  if (diff === -2) return "Antier";

  const d = dateInput instanceof Date ? dateInput : new Date(Number(dateInput));
  const day = d.getDate();
  const monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  return `${day} ${monthNames[d.getMonth()]}`;
}

// 🔧 Agrupa tareas por fecha y las ordena (más nuevas primero)
function groupTasksByRelativeDate(tasks) {
  const groups = {};

  tasks.forEach((task) => {
    const created = Number(task.createdAt) || Date.now();
    const label = getRelativeLabel(created);
    if (!groups[label]) groups[label] = [];
    groups[label].push(task);
  });

  // 🔽 Ordenar tareas dentro de cada grupo (más recientes primero)
  Object.values(groups).forEach((list) =>
    list.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
  );

  // 🔽 Convertir a array y ordenar grupos (más recientes primero)
  const groupsArray = Object.entries(groups)
    .map(([label, items]) => ({
      label,
      date: new Date(items[0].createdAt || Date.now()),
      tasks: items,
    }))
    .sort((a, b) => b.date - a.date);

  return groupsArray;
}

export function TaskGroup({
  tasks,
  handleToggleCompleted,
  setSelectedTask,
  toggleModal,
  clickTimeoutRef,
  hasMounted,
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // ⚡ Agrupar y ordenar solo cuando cambian las tareas
  const grouped = useMemo(() => groupTasksByRelativeDate(tasks), [tasks]);

  // Animación de entrada
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {grouped.map((group) => (
        <View key={group.label} style={styles.group}>
          <Text style={styles.relativeDate}>{group.label}</Text>
          <View style={styles.taskList}>
            {group.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                handleToggleCompleted={handleToggleCompleted}
                setSelectedTask={setSelectedTask}
                toggleModal={toggleModal}
                clickTimeoutRef={clickTimeoutRef}
                hasMounted={hasMounted}
              />
            ))}
          </View>
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  group: {
    width: "100%",
    alignItems: "center",
  },
  relativeDate: {
    paddingHorizontal: 12,
    borderRadius: 6,
    fontSize: 18,
    marginVertical: 15,
    color: "#71717a",
    backgroundColor: "#e4e4e7",
    overflow: "hidden",
    fontFamily: "Geo_400Regular",
  },
  taskList: {
    width: "100%",
    alignItems: "center",
  },
});
