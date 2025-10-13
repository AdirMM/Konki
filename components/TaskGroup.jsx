import { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import { TaskItem } from './TaskItem'

export function TaskGroup({
  relativeDate,
  tasks,
  handleToggleCompleted,
  setSelectedTask,
  toggleModal,
  clickTimeoutRef,
  showCompleted,
  hasMounted,
}) {
  const [shouldRender, setShouldRender] = useState(true)
  const fadeAnim = useRef(new Animated.Value(0)).current

  const hasIncompleteTasks = tasks.some((task) => !task.completed)
  const shouldHide = !showCompleted && !hasIncompleteTasks

  // Animar entrada
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [])

  // Animar salida cuando se debe ocultar
  useEffect(() => {
    if (shouldHide) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => {
        setShouldRender(false)
      })
    } else {
      setShouldRender(true)
    }
  }, [shouldHide])

  if (!shouldRender) return null

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
            showCompleted={showCompleted}
            hasMounted={hasMounted}
          />
        ))}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  relativeDate: {
    paddingHorizontal: 12,
    marginLeft: 12,
    borderRadius: 6,
    fontSize: 17,
    color: '#71717a',
    backgroundColor: '#e4e4e7',
    overflow: 'hidden',
    maxHeight: 32,
    marginBottom: 20,
  },
  taskList: {
    width: '100%',
    alignItems: 'center',
  },
})
