import { useState } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native'
import { useCategoryContext } from '../../context/CategoryContext'
import { useTaskContext } from '../../context/TaskContext'
import { useUIContext } from '../../context/UIContext'
import { Entypo } from '@expo/vector-icons'
import { Shadow } from 'react-native-shadow-2'
import { CustomModal } from './CustomModal'
import { CategoryList } from './CategoryList'

const { width, height } = Dimensions.get('window')

// 🔹 Escalado responsivo basado en ancho de pantalla
const guidelineBaseWidth = 375
const responsiveSize = (size) => (width / guidelineBaseWidth) * size

export function AddTask() {
  const { addTask, taskInput, setTaskInput } = useTaskContext()
  const { modals, toggleModal, switchModal } = useUIContext()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const { category } = useCategoryContext()

  const maxLength = 130

  const handleAddTask = () => {
    if (taskInput.trim() === '') return

    if (!category) {
      console.warn('Debes seleccionar una categoría antes de agregar la tarea.')
      return
    }

    addTask(selectedCategory || category)
    toggleModal('addTask')
  }

  return (
    <CustomModal
      modalName="addTask"
      isOpen={modals?.addTask?.isOpen || false}
      onClose={() => {
        toggleModal('addTask')
      }}
      title="Agregar Tarea"
    >
      <View style={styles.modalView}>
        <Text style={styles.charCount}>
          {taskInput.length}/{maxLength} caracteres
        </Text>

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
              value={taskInput}
              maxLength={maxLength}
              onChangeText={setTaskInput}
              onSubmitEditing={handleAddTask}
              multiline
              placeholder="Añade una tarea"
              style={styles.textInput}
              returnKeyType="done"
              placeholderTextColor="#666"
            />
          </ImageBackground>
        </Shadow>

        <TouchableOpacity
          style={styles.addCategoryButton}
          onPress={() => switchModal('addTask', 'category')}
        >
          <Text style={styles.addCategory}>Nueva Categoria</Text>
        </TouchableOpacity>

        <Shadow
          distance={3}
          startColor="rgba(0,0,0,.9)"
          finalColor="rgba(0,0,0,0)"
          offset={[0, 1]}
          radius={10}
          containerViewStyle={{ marginBottom: 0 }}
        >
          <View style={styles.shadowContainer}>
            <CategoryList
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </View>
        </Shadow>

        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Entypo name="plus" size={responsiveSize(23)} color="white" />
        </TouchableOpacity>
      </View>

      {/* Imágenes decorativas */}
      <Image
        source={require('../../assets/tree.png')}
        style={styles.treeImage}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/gatito1.png')}
        style={styles.catImage}
        resizeMode="contain"
      />
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    width: '90%',
    borderRadius: responsiveSize(12),
    alignItems: 'center',
    zIndex: 1000,
  },
  charCount: {
    color: '#646464',
    marginBottom: responsiveSize(5),
    fontSize: responsiveSize(17),
    fontFamily: 'Geo_400Regular',
  },
  inputBackground: {
    width: width * 0.85,
    minHeight: height * 0.22,
    borderRadius: responsiveSize(10),
    borderWidth: responsiveSize(2.5),
    overflow: 'hidden',
  },
  textInput: {
    flex: 1,
    padding: responsiveSize(10),
    fontFamily: 'Geo_400Regular',
    fontSize: responsiveSize(29),
    letterSpacing: 1.2,
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
    color: '#000',
  },
  addButton: {
    width: '30%',
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingVertical: responsiveSize(14),
    borderRadius: responsiveSize(40),
    alignItems: 'center',
    marginTop: responsiveSize(30),
  },
  addCategoryButton: {
    width: '55%',
    marginTop: responsiveSize(25),
    alignSelf: 'center',
    marginBottom: responsiveSize(20),
    backgroundColor: 'black',
    paddingVertical: responsiveSize(14),
    borderRadius: responsiveSize(10),
  },
  addCategory: {
    color: 'white',
    fontSize: responsiveSize(19),
    textAlign: 'center',
    fontFamily: 'Geo_400Regular',
  },
  shadowContainer: {
    height: responsiveSize(60),
    backgroundColor: 'white',
    borderWidth: responsiveSize(2),
    borderRadius: responsiveSize(10),
    borderColor: '#111',
  },
  treeImage: {
    width: responsiveSize(90),
    height: responsiveSize(90),
    alignSelf: 'center',
    position: 'absolute',
    bottom: responsiveSize(90),
    right: responsiveSize(20),
  },
  catImage: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    alignSelf: 'center',
    position: 'absolute',
    bottom: responsiveSize(90),
    left: responsiveSize(50),
  },
})
