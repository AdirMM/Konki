import { Ionicons, Feather } from '@expo/vector-icons'
import { useState, useRef } from 'react'
import {
  Pressable,
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { useCategoryContext } from '../../context/CategoryContext'

const { width, height } = Dimensions.get('window')

export function FilterCategory() {
  const [showFilter, setShowFilter] = useState(false)
  const rotateAnim = useRef(new Animated.Value(0)).current
  const slideY = useRef(new Animated.Value(-40)).current
  const slideX = useRef(new Animated.Value(40)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  const { categories, setCategory } = useCategoryContext()

  const handleToggle = () => {
    const isOpening = !showFilter

    Animated.timing(rotateAnim, {
      toValue: isOpening ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start()

    if (isOpening) {
      setShowFilter(true)

      Animated.parallel([
        Animated.timing(slideY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(slideX, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(slideY, {
          toValue: -40,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(slideX, {
          toValue: 40,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setShowFilter(false)
      })
    }
  }

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  const handleSelectCategory = (cat) => {
    setCategory(cat)
    handleToggle()
  }

  return (
    <>
      {/* Botón visible */}
      <View style={styles.container}>
        <Shadow distance={5} startColor="#000" offset={[0, 3]}>
          <Pressable onPress={handleToggle}>
            <Animated.View
              style={{ transform: [{ rotate: rotateInterpolation }] }}
            >
              <Ionicons name="filter" size={38} color="white" />
            </Animated.View>
          </Pressable>
        </Shadow>
      </View>

      {/* Menú flotante */}
      {showFilter && (
        <>
          <Pressable style={styles.backdrop} onPress={handleToggle} />

          <Animated.View
            style={[
              styles.dropdown,
              {
                opacity: opacityAnim,
                transform: [{ translateY: slideY }, { translateX: slideX }],
              },
            ]}
          >
            {/* 🔽 Scroll en caso de muchos items */}
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {categories.map((cat) => (
                <Shadow
                  key={cat.name}
                  distance={6}
                  startColor="#000"
                  offset={[0, 3]}
                >
                  <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => handleSelectCategory(cat)}
                  >
                    <View style={styles.buttonContent}>
                      <Feather
                        name={cat.iconName}
                        size={20}
                        color={cat.color}
                      />
                      <Text style={styles.buttonText}>{cat.name}</Text>
                    </View>
                  </TouchableOpacity>
                </Shadow>
              ))}
            </ScrollView>
          </Animated.View>
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  dropdown: {
    position: 'absolute',
    top: height * 0.1,
    right: -10,
    zIndex: 1000,
    maxHeight: height * 0.5, // 🔽 límite visual del scroll
    borderRadius: 12,
    overflow: 'hidden',
  },
  scrollContainer: {
    width: width * 0.45,
    borderRadius: 12,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: height * 0.02,
  },
  menuButton: {
    width: width * 0.4,
    height: height * 0.075,
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontFamily: 'Geo_400Regular_Italic',
  },
})
