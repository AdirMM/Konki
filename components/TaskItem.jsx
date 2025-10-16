import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTaskContext } from '../context/TaskContext'
import { Shadow } from 'react-native-shadow-2'

export function TaskItem({
  task,
  handleToggleCompleted,
  setSelectedTask,
  toggleModal,
  clickTimeoutRef,
  showCompleted,
}) {
  const scaleAnim = useRef(new Animated.Value(0.5)).current
  const opacityAnim = useRef(new Animated.Value(0)).current
  const heightAnim = useRef(new Animated.Value(105)).current
  const containerOpacityAnim = useRef(new Animated.Value(1)).current

  const { removeTask } = useTaskContext()
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const autoHideTimeoutRef = useRef(null)
  const longPressedRef = useRef(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    scaleAnim.setValue(0.5)
    opacityAnim.setValue(0)

    return () => {
      clearTimeout(autoHideTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!showCompleted && task.completed) {
      // Ocultar con animación
      Animated.parallel([
        Animated.timing(containerOpacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(heightAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => setIsVisible(false))
    } else {
      // Mostrar con animación
      setIsVisible(true)
      heightAnim.setValue(0)
      containerOpacityAnim.setValue(0)
      Animated.parallel([
        Animated.timing(heightAnim, {
          toValue: 105,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(containerOpacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start()
    }
  }, [showCompleted])

  const handleLongPress = () => {
    longPressedRef.current = true
    setSelectedTask(task)
    setShowDeleteButton(true)

    clearTimeout(autoHideTimeoutRef.current)

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start()

    autoHideTimeoutRef.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setShowDeleteButton(false)
      })
    }, 2000)
  }

  const handleClick = () => {
    if (longPressedRef.current) {
      longPressedRef.current = false
      return
    }

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
      clickTimeoutRef.current = null
      setSelectedTask(task)
      toggleModal('editTask')
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        handleToggleCompleted(task)
        clickTimeoutRef.current = null
      }, 170)
    }
  }

  const handleDeleteClick = () => {
    Animated.parallel([
      Animated.timing(containerOpacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      removeTask(task.id)
      setShowDeleteButton(false)
    })
  }

  const completedAnim = useRef(
    new Animated.Value(task.completed ? 1 : 0)
  ).current

  useEffect(() => {
    Animated.timing(completedAnim, {
      toValue: task.completed ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [task.completed])

  const animatedColor = completedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#888'],
  })

  if (!isVisible) return null

  const iconName = task.category?.iconName || 'list'
  const iconColor = task.category?.color || '#000'

  return (
    <Animated.View
      style={[
        styles.outerMargin,
        { height: heightAnim, opacity: containerOpacityAnim },
      ]}
    >
      <Shadow
        distance={2}
        offset={[0, 5]}
        startColor="rgba(0,0,0,0.9)"
        containerStyle={{ borderRadius: 40 }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleClick}
            activeOpacity={1}
            onLongPress={handleLongPress}
            delayLongPress={220}
            style={styles.taskWrapper}
          >
            <Feather name={iconName} size={24} color={iconColor} />
            <Animated.Text
              style={[
                styles.taskText,
                {
                  color: animatedColor,
                  textDecorationLine: task.completed ? 'line-through' : 'none',
                },
              ]}
            >
              {task.text.length > 30
                ? `${task.text.slice(0, 30)}...`
                : task.text}
            </Animated.Text>
          </TouchableOpacity>

          {showDeleteButton && (
            <Animated.View
              style={[
                styles.deleteButton,
                {
                  opacity: opacityAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <TouchableOpacity
                onPress={handleDeleteClick}
                style={styles.deleteButtonInner}
                activeOpacity={0.8}
              >
                <Text style={styles.deleteButtonText}>Borrar</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </Shadow>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  outerMargin: {
    marginVertical: 1,
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    width: 270,
    height: 90,
    borderRadius: 16,
    overflow: 'visible',
    backgroundColor: '#111',
  },
  taskWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    padding: 18,
  },
  taskText: {
    fontSize: 27,
    textAlign: 'center',
    color: '#fff',
    flex: 1,
    paddingLeft: 1,
    fontFamily: 'Geo_400Regular',
  },
  deleteButton: {
    position: 'absolute',
    top: '15%',
    left: 105,
    backgroundColor: '#dc2626',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -40 }],
  },
  deleteButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
