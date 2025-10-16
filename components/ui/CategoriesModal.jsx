import { useState, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native'
import { useUIContext } from '../../context/UIContext'
import { useCategoryContext } from '../../context/CategoryContext'
import { CustomModal } from './CustomModal'
import { Feather } from '@expo/vector-icons'
import { Shadow } from 'react-native-shadow-2'

const guidelineBaseWidth = 375
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const columns = 2
const horizontalPadding = 16 * (columns - 1)
const itemWidth = (screenWidth * 0.8 - horizontalPadding) / columns

export function CategoriesModal() {
  const { modals, toggleModal, setSelectedCategory } = useUIContext()
  const { categories } = useCategoryContext()
  const [showArrow, setShowArrow] = useState(false)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scrollRef = useRef(null)

  const responsiveSize = (size) => (screenWidth / guidelineBaseWidth) * size

  const handleClick = (cat) => {
    setSelectedCategory(cat)
    toggleModal('categories')
    setTimeout(() => {
      toggleModal('category')
    }, 300)
  }

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    if (contentHeight > screenHeight * 0.38) {
      if (!showArrow) {
        setShowArrow(true)
        Animated.loop(
          Animated.sequence([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
          ])
        ).start()
      }
    } else {
      setShowArrow(false)
      fadeAnim.setValue(0)
    }
  }

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent
    const endReached =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 10

    setIsAtEnd(endReached)
  }

  const handleArrowPress = () => {
    if (isAtEnd && scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true })
      setIsAtEnd(false)
    } else if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true })
    }
  }

  const styles = createStyles(responsiveSize, itemWidth)

  return (
    <CustomModal
      modalName="categories"
      isOpen={modals?.categories?.isOpen || false}
      onClose={() => toggleModal('categories')}
      title="Categorías"
    >
      <View style={styles.modalView}>
        <Text style={styles.note}>
          Nota: Si quieres editar una categoría da click sobre ella ;)
        </Text>

        <ScrollView
          ref={scrollRef}
          style={{ maxHeight: screenHeight * 0.38, width: '100%' }}
          contentContainerStyle={styles.gridContainer}
          onContentSizeChange={handleContentSizeChange}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {categories
            .filter((cat) => cat.id !== 'todas')
            .slice(1)
            .map((cat) => (
              <View
                key={cat.id}
                style={{ width: itemWidth }} // Contenedor fijo
              >
                <Shadow
                  distance={8}
                  startColor="#000"
                  offset={[0, 5]}
                  style={{ flex: 1 }}
                >
                  <TouchableOpacity
                    onPress={() => handleClick(cat)}
                    activeOpacity={1}
                    style={[styles.categoryItem, { flex: 1 }]} // Ocupa todo el Shadow
                  >
                    <View style={styles.buttonContent}>
                      <Feather
                        name={cat.iconName || 'layers'}
                        size={responsiveSize(20)}
                        color={cat.color}
                      />
                      <Text style={styles.categoryText}>{cat.name}</Text>
                    </View>
                  </TouchableOpacity>
                </Shadow>
              </View>
            ))}
        </ScrollView>

        {showArrow && (
          <Animated.View>
            <Shadow
              distance={5}
              startColor="#000"
              offset={[0, 8]}
              style={styles.arrowShadow}
            >
              <TouchableOpacity onPress={handleArrowPress}>
                <Animated.View
                  style={[styles.arrowContainer, { opacity: fadeAnim }]}
                >
                  <Feather
                    name={isAtEnd ? 'chevron-up' : 'chevron-down'}
                    size={responsiveSize(40)}
                    color="#fff"
                  />
                </Animated.View>
              </TouchableOpacity>
            </Shadow>
          </Animated.View>
        )}
      </View>

      {/* Imágenes decorativas */}
      <Image
        source={require('../../assets/island.png')}
        style={{
          width: responsiveSize(220),
          height: responsiveSize(220),
          alignSelf: 'center',
          position: 'absolute',
          bottom: responsiveSize(60),
          right: responsiveSize(20),
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/gatito1.png')}
        style={{
          width: responsiveSize(90),
          height: responsiveSize(90),
          alignSelf: 'center',
          position: 'absolute',
          bottom: responsiveSize(50),
          left: responsiveSize(50),
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/cloud.png')}
        style={{
          width: responsiveSize(160),
          height: responsiveSize(160),
          alignSelf: 'center',
          position: 'absolute',
          bottom: responsiveSize(250),
          left: responsiveSize(50),
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/cloud.png')}
        style={{
          width: responsiveSize(160),
          height: responsiveSize(160),
          alignSelf: 'center',
          position: 'absolute',
          bottom: responsiveSize(250),
          left: responsiveSize(240),
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/gatito3.png')}
        style={{
          width: responsiveSize(90),
          height: responsiveSize(90),
          alignSelf: 'center',
          position: 'absolute',
          bottom: responsiveSize(180),
          left: responsiveSize(50),
        }}
        resizeMode="contain"
      />
    </CustomModal>
  )
}

const createStyles = (responsiveSize, itemWidth) =>
  StyleSheet.create({
    modalView: {
      width: '85%',
      alignSelf: 'center',
      borderRadius: responsiveSize(12),
      zIndex: 1000,
      alignItems: 'center',
    },
    note: {
      textAlign: 'center',
      color: '#000',
      fontSize: responsiveSize(20),
      fontFamily: 'Geo_400Regular',
      marginBottom: responsiveSize(25),
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: responsiveSize(4),
      gap: responsiveSize(10),
    },
    categoryItem: {
      width: itemWidth,
      height: responsiveSize(55),
      justifyContent: 'center',
      borderWidth: responsiveSize(2),
      borderRadius: responsiveSize(10),
      padding: responsiveSize(10),
      marginBottom: responsiveSize(16),
      borderColor: '#000',
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: responsiveSize(10),
    },
    categoryText: {
      fontSize: responsiveSize(22),
      letterSpacing: 1,
      fontFamily: 'Geo_400Regular',
      color: '#fff',
    },
    arrowContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: responsiveSize(4),
    },
    arrowShadow: {
      marginTop: responsiveSize(10),
      alignSelf: 'center',
    },
  })
