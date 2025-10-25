import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { useTaskContext } from "../context/TaskContext";
import { useCategoryContext } from "../context/CategoryContext";
import { responsiveSize } from "../utils/responsive";

export function BgDrawings() {
  const { tasks } = useTaskContext();
  const { category: selectedCategory } = useCategoryContext();

  // Filtrar por categoría (ya no usamos showCompleted)
  const filteredTasks = tasks.filter((task) => {
    return (
      selectedCategory?.name === "Todas" ||
      task.categoryId === selectedCategory?.id
    );
  });

  const hasTasks = tasks.length > 0;
  const visibleCount = filteredTasks.length;

  // Animaciones
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

    // Consejo1 y 2: si hay una sola tarea visible
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
        source={require("../assets/spider.png")}
        style={[
          styles.spider,
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
        source={require("../assets/keys.png")}
        style={[
          styles.keys,
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
            transform: [{ translateY: contentTranslate }],
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
  },
  filter: {
    position: "absolute",
    top: responsiveSize(135),
    right: responsiveSize(10),
    width: responsiveSize(170),
    height: responsiveSize(105),
  },
  addtask: {
    position: "absolute",
    bottom: responsiveSize(210),
    right: responsiveSize(12),
    width: responsiveSize(240),
    height: responsiveSize(130),
  },
  spider: {
    position: "absolute",
    bottom: responsiveSize(325),
    right: responsiveSize(-17),
    width: responsiveSize(90),
    height: responsiveSize(70),
  },
  hornet: {
    position: "absolute",
    top: responsiveSize(92),
    right: responsiveSize(45),
    width: responsiveSize(100),
    height: responsiveSize(100),
  },
  shark: {
    position: "absolute",
    left: responsiveSize(-5),
    top: responsiveSize(270),
    width: responsiveSize(60),
    height: responsiveSize(60),
  },
  airplane: {
    position: "absolute",
    left: responsiveSize(10),
    bottom: responsiveSize(120),
    width: responsiveSize(125),
    height: responsiveSize(140),
  },
  keys: {
    position: "absolute",
    right: responsiveSize(10),
    bottom: responsiveSize(15),
    width: responsiveSize(105),
    height: responsiveSize(120),
  },
  despescar: {
    position: "absolute",
    bottom: responsiveSize(130),
    right: responsiveSize(-15),
    width: responsiveSize(230),
    height: responsiveSize(240),
  },
  consejo1: {
    position: "absolute",
    top: responsiveSize(310),
    left: responsiveSize(10),
    width: responsiveSize(160),
    height: responsiveSize(120),
  },
  consejo2: {
    position: "absolute",
    top: responsiveSize(320),
    right: responsiveSize(10),
    width: responsiveSize(160),
    height: responsiveSize(120),
  },
  todelete: {
    position: "absolute",
    bottom: responsiveSize(280),
    left: responsiveSize(100),
    width: responsiveSize(190),
    height: responsiveSize(120),
  },
});
