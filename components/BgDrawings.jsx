import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Dimensions } from 'react-native'
import { useTaskContext } from '../context/TaskContext'
import { useUIContext } from '../context/UIContext'
import { useCategoryContext } from '../context/CategoryContext' // <--- para la categoría filtrada

const { width } = Dimensions.get('window')
const guidelineBaseWidth = 375
const responsiveSize = (size) => (width / guidelineBaseWidth) * size

export function BgDrawings() {
  const { tasks } = useTaskContext()
  const { showCompleted } = useUIContext()
  const { category: selectedCategory } = useCategoryContext() // categoría seleccionada

  // Filtrado de tareas según completadas y categoría
  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      selectedCategory?.name === 'Todas' ||
      task.categoryId === selectedCategory?.id
    const matchesCompleted = showCompleted || !task.completed
    return matchesCategory && matchesCompleted
  })

  const hasTasks = tasks.length > 0
  const visibleCount = filteredTasks.length

  const contentOpacity = useRef(new Animated.Value(0)).current
  const contentTranslate = useRef(new Animated.Value(20)).current
  const emptyOpacity = useRef(new Animated.Value(0)).current
  const emptyTranslate = useRef(new Animated.Value(20)).current
  const consejoOpacity = useRef(new Animated.Value(0)).current
  const consejoTranslate = useRef(new Animated.Value(20)).current
  const todeleteOpacity = useRef(new Animated.Value(0)).current
  const todeleteTranslate = useRef(new Animated.Value(20)).current

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
    ]).start()

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
    ]).start()

    // Consejo1 y 2: solo si hay al menos una tarea visible
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
    ]).start()

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
    ]).start()
  }, [hasTasks, visibleCount, selectedCategory])

  return (
    <>
      {/* Sin tareas */}
      <Animated.Image
        source={require('../assets/options.png')}
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
        source={require('../assets/filter.png')}
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
        source={require('../assets/addtask.png')}
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
        source={require('../assets/cloud.png')}
        style={[
          styles.cloud,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslate }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require('../assets/island.png')}
        style={[
          styles.island,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslate }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require('../assets/airplane.png')}
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
        source={require('../assets/depescar.png')}
        style={[
          styles.despescar,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslate }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require('../assets/gatito6.png')}
        style={[
          styles.gatito6,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslate }],
          },
        ]}
        resizeMode="contain"
      />

      {/* Consejo1 y 2 */}
      <Animated.Image
        source={require('../assets/consejo1.png')}
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
        source={require('../assets/consejo2.png')}
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
        source={require('../assets/todelete.png')}
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
  )
}

const styles = StyleSheet.create({
  options: {
    position: 'absolute',
    top: responsiveSize(140),
    left: responsiveSize(10),
    width: responsiveSize(170),
    height: responsiveSize(105),
  },
  filter: {
    position: 'absolute',
    top: responsiveSize(125),
    right: responsiveSize(10),
    width: responsiveSize(170),
    height: responsiveSize(105),
  },
  addtask: {
    position: 'absolute',
    bottom: responsiveSize(210),
    right: responsiveSize(12),
    width: responsiveSize(240),
    height: responsiveSize(130),
  },
  cloud: {
    position: 'absolute',
    top: responsiveSize(80),
    left: responsiveSize(18),
    width: responsiveSize(90),
    height: responsiveSize(70),
    filter: 'grayscale(100%)',
  },
  island: {
    position: 'absolute',
    top: responsiveSize(85),
    right: responsiveSize(18),
    width: responsiveSize(130),
    height: responsiveSize(130),
    filter: 'grayscale(100%)',
  },
  airplane: {
    position: 'absolute',
    bottom: responsiveSize(120),
    width: responsiveSize(95),
    height: responsiveSize(90),
    filter: 'grayscale(100%)',
  },
  despescar: {
    position: 'absolute',
    bottom: responsiveSize(150),
    right: responsiveSize(-18),
    width: responsiveSize(200),
    height: responsiveSize(240),
  },
  gatito6: {
    position: 'absolute',
    bottom: responsiveSize(60),
    right: 0,
    width: responsiveSize(70),
    height: responsiveSize(85),
  },
  consejo1: {
    position: 'absolute',
    top: responsiveSize(310),
    left: responsiveSize(10),
    width: responsiveSize(160),
    height: responsiveSize(120),
  },
  consejo2: {
    position: 'absolute',
    top: responsiveSize(320),
    right: responsiveSize(10),
    width: responsiveSize(160),
    height: responsiveSize(120),
  },
  todelete: {
    position: 'absolute',
    bottom: responsiveSize(260),
    left: responsiveSize(100),
    width: responsiveSize(190),
    height: responsiveSize(140),
  },
})
