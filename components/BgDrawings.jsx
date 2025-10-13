import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Dimensions } from 'react-native'
import { useTaskContext } from '../context/TaskContext'
import { useUIContext } from '../context/UIContext'

const { width, height } = Dimensions.get('window')

export function BgDrawings() {
  const { tasks } = useTaskContext()
  const { showCompleted } = useUIContext()

  const visibleTasks = showCompleted
    ? tasks
    : tasks.filter((task) => !task.completed)
  const visibleCount = visibleTasks.length

  const contentOpacity = useRef(new Animated.Value(0)).current
  const contentTranslate = useRef(new Animated.Value(20)).current

  const emptyOpacity = useRef(new Animated.Value(0)).current
  const emptyTranslate = useRef(new Animated.Value(20)).current

  const consejoOpacity = useRef(new Animated.Value(0)).current
  const consejoTranslate = useRef(new Animated.Value(20)).current

  const todeleteOpacity = useRef(new Animated.Value(0)).current
  const todeleteTranslate = useRef(new Animated.Value(20)).current

  const hasTasks = tasks.length > 0

  useEffect(() => {
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
  }, [hasTasks, visibleCount])

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
        source={require('../assets/gatito5.png')}
        style={[
          styles.gatito5,
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

      {/* 1 tarea visible */}
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
    top: height * 0.22,
    left: width * 0.03,
    width: width * 0.42,
    height: height * 0.12,
  },
  filter: {
    position: 'absolute',
    top: height * 0.2,
    right: width * 0.04,
    width: width * 0.45,
    height: height * 0.12,
  },
  addtask: {
    position: 'absolute',
    bottom: height * 0.33,
    right: width * 0.03,
    width: width * 0.65,
    height: height * 0.12,
  },
  cloud: {
    position: 'absolute',
    top: height * 0.12,
    left: width * 0.05,
    width: width * 0.25,
    height: height * 0.1,
  },
  island: {
    position: 'absolute',
    top: height * 0.12,
    right: width * 0.05,
    width: width * 0.35,
    height: height * 0.17,
  },
  gatito5: {
    position: 'absolute',
    bottom: height * 0.16,
    left: width * -0.05,
    width: width * 0.25,
    height: height * 0.12,
  },
  gatito6: {
    position: 'absolute',
    bottom: height * 0.08,
    right: width * -0.02,
    width: width * 0.25,
    height: height * 0.12,
  },
  consejo1: {
    position: 'absolute',
    bottom: height * 0.42,
    left: width * 0.04,
    width: width * 0.45,
    height: height * 0.18,
  },
  consejo2: {
    position: 'absolute',
    bottom: height * 0.34,
    right: width * 0.02,
    width: width * 0.45,
    height: height * 0.18,
  },
  todelete: {
    position: 'absolute',
    bottom: height * 0.32,
    left: width * 0.25,
    width: width * 0.48,
    height: height * 0.16,
  },
})
