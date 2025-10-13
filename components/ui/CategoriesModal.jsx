import { useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUIContext } from '../../context/UIContext'
import { useCategoryContext } from '../../context/CategoryContext'
import { CustomModal } from './CustomModal'
import { Feather } from '@expo/vector-icons'
import { Shadow } from 'react-native-shadow-2'

const guidelineBaseWidth = 375
const { width: screenWidth } = Dimensions.get('window')
const columns = 2
const horizontalPadding = 16 * (columns - 1)
const itemWidth = (screenWidth * 0.8 - horizontalPadding) / columns

export function CategoriesModal() {
  const { modals, toggleModal, setSelectedCategory } = useUIContext()
  const { categories } = useCategoryContext()

  // 🔹 Función responsiva como en AddTask
  const responsiveSize = (size) => (screenWidth / guidelineBaseWidth) * size

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const stored = await AsyncStorage.getItem('categories')
        const parsed = stored ? JSON.parse(stored) : []
        const validCategories = parsed.filter(
          (cat) =>
            cat.name &&
            cat.color &&
            cat.iconName &&
            cat.name.toLowerCase() !== 'todas'
        )
      } catch (error) {
        console.error('Error al cargar categorías:', error)
      }
    }

    fetchCategories()
  }, [modals?.categories?.isOpen])

  const handleClick = (cat) => {
    setSelectedCategory(cat)
    toggleModal('categories')
    setTimeout(() => {
      toggleModal('category')
    }, 300)
  }

  const styles = createStyles(responsiveSize, itemWidth)

  return (
    <CustomModal
      modalName="categories"
      isOpen={modals?.categories?.isOpen || false}
      onClose={() => {
        toggleModal('categories')
      }}
      title="Categorias"
    >
      <View style={styles.modalView}>
        <Text style={styles.note}>
          Nota: Si quieres editar una categoría da click sobre ella ;)
        </Text>

        <ScrollView contentContainerStyle={styles.gridContainer}>
          {categories
            .filter((cat) => cat.name?.toLowerCase().trim() !== 'todas')
            .map((cat) => (
              <Shadow
                key={cat.name}
                distance={8}
                startColor="#000"
                offset={[0, 5]}
                style={{ width: itemWidth }}
              >
                <TouchableOpacity
                  onPress={() => handleClick(cat)}
                  activeOpacity={0.7}
                  style={styles.categoryItem}
                >
                  <Animated.View style={styles.buttonContent}>
                    <Feather
                      name={cat.iconName || 'layers'}
                      size={responsiveSize(20)}
                      color={cat.color}
                    />
                    <Text style={styles.categoryText}>{cat.name}</Text>
                  </Animated.View>
                </TouchableOpacity>
              </Shadow>
            ))}
        </ScrollView>
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
  })
