import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { TaskItem } from "./TaskItem";

export function TaskGroup({
  relativeDate,
  tasks,
  handleToggleCompleted,
  setSelectedTask,
  toggleModal,
  clickTimeoutRef,
  hasMounted,
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animación de entrada del grupo
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
      <Text style={styles.relativeDate}>{relativeDate}</Text>
      <View style={styles.taskList}>
        {tasks.map((task) => (
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
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
