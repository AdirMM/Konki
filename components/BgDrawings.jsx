import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { useTaskContext } from "../context/TaskContext";
import { useUIContext } from "../context/UIContext";
import { useCategoryContext } from "../context/CategoryContext";
import { responsiveSize } from "../utils/responsive"; // ✅ Importa tu sistema responsive

export function BgDrawings() {
  const { tasks } = useTaskContext();
  const { showCompleted } = useUIContext();
  const { category: selectedCategory } = useCategoryContext(); // categoría seleccionada

  // Filtrado de tareas según completadas y categoría
  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      selectedCategory?.name === "Todas" ||
      task.categoryId === selectedCategory?.id;
    const matchesCompleted = showCompleted || !task.completed;
    return matchesCategory && matchesCompleted;
  });

  const hasTasks = tasks.length > 0;
  const visibleCount = filteredTasks.length;

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(20)).current;
  const emptyOpacity = useRef(new Animated.Value(0)).current;
  const emptyTranslate = useRef(new Animated.Value(20)).current;
  const consejoOpacity = useRef(new Animated.Value(0)).current;
  const consejoTranslate = useRef(new Animated.Value(20)).current;
  const todeleteOpacity = useRef(new Animated.Value(0)).current;
  const todeleteTranslate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Con tareas
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: hasTasks ? 1 : 0,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(contentTranslate, {
        toValue: hasTasks ? 0 : 20,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();

    // Sin tareas
    Animated.parallel([
      Animated.timing(emptyOpacity, {
        toValue: hasTasks ? 0 : 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(emptyTranslate, {
        toValue: hasTasks ? 20 : 0,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();

    // Consejo1 y 2: solo si hay una tarea visible
    Animated.parallel([
      Animated.timing(consejoOpacity, {
        toValue: visibleCount === 1 ? 1 : 0,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(consejoTranslate, {
        toValue: visibleCount === 1 ? 0 : 20,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();

    // Todelete: solo si hay exactamente 2 tareas visibles
    Animated.parallel([
      Animated.timing(todeleteOpacity, {
        toValue: visibleCount === 2 ? 1 : 0,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(todeleteTranslate, {
        toValue: visibleCount === 2 ? 0 : 20,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  }, [hasTasks, visibleCount, selectedCategory]);

  return (
    <>
      {/* Sin tareas */}
      <Animated.Image
        source={require("../assets/options.png")}
        style={[
          styles.options,
          {
            opacity: emptyOpacity,
            transform: [{ translateY: emptyTranslate }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("../assets/filter.png")}
        style={[
          styles.filter,
          {
            opacity: emptyOpacity,
            transform: [{ translateY: emptyTranslate }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("../assets/addtask.png")}
        style={[
          styles.addtask,
          {
            opacity: emptyOpacity,
            transform: [{ translateY: emptyTranslate }],
          },
        ]}
        resizeMode="contain"
      />

      {/* Con tareas */}
      <Animated.Image
        source={require("../assets/globe.png")}
        style={[
          styles.globe,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslate }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("../assets/hornet.png")}
        style={[
          styles.hornet,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslate }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("../assets/airplane1.png")}
        style={[
          styles.airplane,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslate }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("../assets/shark.png")}
        style={[
          styles.shark,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslate }, { rotate: "180deg" }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("../assets/depescar.png")}
        style={[
          styles.despescar,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslate }],
          },
        ]}
        resizeMode="contain"
      />
      {/* Consejo1 y 2 */}
      <Animated.Image
        source={require("../assets/consejo1.png")}
        style={[
          styles.consejo1,
          {
            opacity: consejoOpacity,
            transform: [{ translateY: consejoTranslate }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("../assets/consejo2.png")}
        style={[
          styles.consejo2,
          {
            opacity: consejoOpacity,
            transform: [{ translateY: consejoTranslate }],
          },
        ]}
        resizeMode="contain"
      />

      {/* 2 tareas visibles */}
      <Animated.Image
        source={require("../assets/todelete.png")}
        style={[
          styles.todelete,
          {
            opacity: todeleteOpacity,
            transform: [{ translateY: todeleteTranslate }],
          },
        ]}
        resizeMode="contain"
      />
    </>
  );
}

const styles = StyleSheet.create({
  options: {
    position: "absolute",
    top: responsiveSize(140),
    left: responsiveSize(10),
    width: responsiveSize(170),
    height: responsiveSize(105),
    zIndex: 10,
  },
  filter: {
    position: "absolute",
    top: responsiveSize(125),
    right: responsiveSize(10),
    width: responsiveSize(170),
    height: responsiveSize(105),
    zIndex: 10,
  },
  addtask: {
    position: "absolute",
    bottom: responsiveSize(235),
    right: responsiveSize(12),
    width: responsiveSize(240),
    height: responsiveSize(130),
    zIndex: 10,
  },
  globe: {
    position: "absolute",
    bottom: responsiveSize(45),
    left: responsiveSize(18),
    width: responsiveSize(90),
    height: responsiveSize(70),
  },
  hornet: {
    position: "absolute",
    top: responsiveSize(105),
    right: responsiveSize(45),
    width: responsiveSize(100),
    height: responsiveSize(100),
  },
  shark: {
    position: "absolute",
    left: responsiveSize(10),
    top: responsiveSize(140),
    width: responsiveSize(70),
    height: responsiveSize(70),
  },
  airplane: {
    position: "absolute",
    left: responsiveSize(-10),
    bottom: responsiveSize(200),
    width: responsiveSize(125),
    height: responsiveSize(140),
  },
  despescar: {
    position: "absolute",
    bottom: responsiveSize(130),
    right: responsiveSize(-18),
    width: responsiveSize(200),
    height: responsiveSize(240),
  },
  consejo1: {
    position: "absolute",
    top: responsiveSize(310),
    left: responsiveSize(10),
    width: responsiveSize(160),
    height: responsiveSize(120),
    zIndex: 10,
  },
  consejo2: {
    position: "absolute",
    top: responsiveSize(320),
    right: responsiveSize(10),
    width: responsiveSize(160),
    height: responsiveSize(120),
    zIndex: 10,
  },
  todelete: {
    position: "absolute",
    bottom: responsiveSize(280),
    left: responsiveSize(100),
    width: responsiveSize(190),
    height: responsiveSize(120),
    zIndex: 10,
  },
});
