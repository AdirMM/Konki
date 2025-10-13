import { useEffect, useState, useRef } from 'react'
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { CustomModal } from './CustomModal'
import { iconList } from '../../utils/icons'
import { useUIContext } from '../../context/UIContext'
import { useCategoryContext } from '../../context/CategoryContext'

const { width } = Dimensions.get('window')
const guidelineBaseWidth = 375
const responsiveSize = (size) => (width / guidelineBaseWidth) * size

const icons = iconList

export function CategoryModal() {
  const { addCategory, categories, updateCategory, deleteCategory } =
    useCategoryContext()
  const { modals, toggleModal, selectedCategory, setSelectedCategory } =
    useUIContext()

  const [newCategory, setNewCategory] = useState('')
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [selectedIcon, setSelectedIcon] = useState('')
  const [iconError, setIconError] = useState(false)
  const [showIconError, setShowIconError] = useState(false)

  // Persistente para animaciones
  const iconErrorOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (iconError) {
      setShowIconError(true)
      Animated.timing(iconErrorOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(iconErrorOpacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setShowIconError(false))
    }
  }, [iconError])

  useEffect(() => {
    if (!selectedCategory) return
    const updated = categories.find((cat) => cat.name === selectedCategory.name)
    if (updated) setSelectedCategory(updated)
  }, [categories])

  useEffect(() => {
    if (selectedCategory) {
      setNewCategory(selectedCategory.name)
      setSelectedColor(selectedCategory.color)
      setSelectedIcon(selectedCategory.iconName)
      setIconError(false)
    } else {
      setNewCategory('')
      setSelectedColor('#3b82f6')
      setSelectedIcon('')
      setIconError(false)
    }
  }, [selectedCategory])

  const handleCategory = () => {
    if (newCategory.trim() === '') return

    if (!selectedIcon || selectedIcon.trim() === '') {
      setIconError(true)
      return
    }

    if (selectedCategory) {
      updateCategory({
        name: newCategory,
        color: selectedColor,
        iconName: selectedIcon,
      })
      setSelectedCategory({
        name: newCategory,
        color: selectedColor,
        iconName: selectedIcon,
      })
      toggleModal('category')
    } else {
      addCategory({
        name: newCategory,
        color: selectedColor,
        iconName: selectedIcon,
      })
      toggleModal('category')
      setTimeout(() => toggleModal('addTask'), 200)
    }

    setNewCategory('')
    setSelectedColor('#3b82f6')
    setSelectedIcon('')
    setSelectedCategory(null)
    setIconError(false)
  }

  const handleDelete = () => {
    deleteCategory(selectedCategory.name)
    toggleModal('category')
  }

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') handleCategory()
  }

  const colors = [
    '#3b82f6',
    '#22c55e',
    '#ef4444',
    '#eab308',
    '#a855f7',
    '#0ea5e9',
    '#f97316',
    '#10b981',
    '#6366f1',
    '#f24ace',
    '#6b7280',
    '#000000',
  ]

  return (
    <CustomModal
      modalName="category"
      isOpen={modals?.category?.isOpen || false}
      onClose={() => {
        toggleModal('category')
        setSelectedCategory(null)
        setIconError(false)
      }}
      title="Categoría"
    >
      <View style={styles.container}>
        {/* --- Nombre --- */}
        <Text style={styles.label}>Nombre</Text>
        <Shadow
          distance={3}
          startColor="rgba(0,0,0,.9)"
          finalColor="rgba(0,0,0,0)"
          offset={[0, 5]}
          radius={10}
          containerViewStyle={{ marginBottom: responsiveSize(20) }}
        >
          <ImageBackground
            source={require('../../assets/notebook.jpg')}
            style={styles.inputBackground}
            imageStyle={{ borderRadius: responsiveSize(10) }}
          >
            <TextInput
              style={styles.textInput}
              placeholder="Ej. Compras, Familia..."
              placeholderTextColor="#666"
              value={newCategory}
              maxLength={10}
              onChangeText={setNewCategory}
              onKeyPress={handleKeyPress}
              returnKeyType="done"
            />
          </ImageBackground>
        </Shadow>

        {/* --- Colores siempre visibles --- */}
        <Text style={styles.label}>Elige un color</Text>
        <View style={styles.colorContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedColor === color && styles.colorSelected,
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>

        {/* --- Error de ícono --- */}
        {showIconError && (
          <Animated.View
            style={{
              opacity: iconErrorOpacity,
              marginTop: responsiveSize(20),
              alignItems: 'center',
            }}
          >
            <Shadow distance={5} startColor="#ab0000" offset={[0, 3]}>
              <View
                style={{
                  backgroundColor: '#ab0000',
                  borderRadius: 6,
                  paddingHorizontal: responsiveSize(12),
                  paddingVertical: responsiveSize(6),
                }}
              >
                <Text style={styles.iconErrorText}>
                  Por favor elige un ícono
                </Text>
              </View>
            </Shadow>
          </Animated.View>
        )}

        {/* --- Íconos siempre visibles --- */}
        <Text style={styles.label}>Elige un ícono</Text>
        <View style={styles.iconsContainer}>
          {icons.map(({ name, component: IconComponent }) => {
            const Icon = IconComponent
            return (
              <TouchableOpacity
                key={name}
                style={[
                  styles.iconBox,
                  selectedIcon === name && styles.iconSelected,
                ]}
                onPress={() => {
                  setSelectedIcon(name)
                  setIconError(false)
                }}
              >
                <Icon size={responsiveSize(26)} />
              </TouchableOpacity>
            )
          })}
        </View>

        {/* --- Botones --- */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleCategory}>
            {selectedCategory ? (
              <Feather name="edit-2" size={responsiveSize(22)} color="white" />
            ) : (
              <Entypo name="plus" size={responsiveSize(28)} color="white" />
            )}
          </TouchableOpacity>

          {selectedCategory && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <AntDesign
                name="delete"
                size={responsiveSize(22)}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* --- Imágenes decorativas --- */}
      <Image
        source={require('../../assets/flower.png')}
        style={styles.flowerImage}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/cloud.png')}
        style={styles.cloudImage}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/gatito5.png')}
        style={styles.catImage}
        resizeMode="contain"
      />
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  label: {
    fontSize: responsiveSize(30),
    marginVertical: responsiveSize(14),
    textAlign: 'center',
    fontFamily: 'Geo_400Regular',
  },
  iconErrorText: {
    color: '#fff',
    fontSize: responsiveSize(20),
    textAlign: 'center',
    fontFamily: 'Geo_400Regular',
  },
  inputBackground: {
    width: width * 0.6,
    height: responsiveSize(50),
    borderRadius: responsiveSize(10),
    borderWidth: responsiveSize(2.5),
    marginBottom: responsiveSize(10),
    overflow: 'hidden',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: responsiveSize(15),
    fontSize: responsiveSize(25),
    fontFamily: 'Geo_400Regular',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#000',
  },
  colorContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsiveSize(18),
  },
  colorCircle: {
    width: responsiveSize(29),
    height: responsiveSize(29),
    borderRadius: responsiveSize(10),
    borderWidth: responsiveSize(2),
    borderColor: 'transparent',
  },
  colorSelected: { borderColor: 'black' },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: responsiveSize(20),
  },
  iconBox: {
    width: responsiveSize(30),
    height: responsiveSize(30),
    borderRadius: responsiveSize(8),
    borderWidth: responsiveSize(2),
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSelected: { borderColor: 'black' },
  buttonsContainer: {
    flexDirection: 'row',
    gap: responsiveSize(15),
    marginTop: responsiveSize(50),
  },
  saveButton: {
    width: '34%',
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingVertical: responsiveSize(18),
    borderRadius: responsiveSize(40),
    alignItems: 'center',
  },
  deleteButton: {
    width: '34%',
    alignSelf: 'center',
    backgroundColor: '#ce0101',
    paddingVertical: responsiveSize(18),
    borderRadius: responsiveSize(40),
    alignItems: 'center',
  },
  flowerImage: {
    width: responsiveSize(100),
    height: responsiveSize(120),
    alignSelf: 'center',
    position: 'absolute',
    bottom: responsiveSize(90),
    right: responsiveSize(-12),
  },
  cloudImage: {
    width: responsiveSize(100),
    height: responsiveSize(120),
    alignSelf: 'center',
    position: 'absolute',
    bottom: responsiveSize(50),
    left: responsiveSize(16),
  },
  catImage: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    alignSelf: 'center',
    position: 'absolute',
    top: responsiveSize(-10),
    left: responsiveSize(15),
  },
})
