import { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'

const images = {
  addtask2: require('../assets/addtask2.png'),
  'no-tasks': require('../assets/notasks.png'),
  nothing: require('../assets/nothing.png'),
}

export function EmptyState({ src = 'no-tasks' }) {
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(50)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start()
  }, [])

  const source = images[src] || images['no-tasks'] // Protección extra

  return (
    <Animated.Image
      source={source}
      style={[
        styles.image,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
      resizeMode="contain"
    />
  )
}

const styles = StyleSheet.create({
  image: {
    position: 'relative',
    bottom: 64,
    width: 300,
    height: 500,
    alignSelf: 'center',
    opacity: 0.9,
  },
})
