import { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
} from 'react-native'
import { useCategoryContext } from '../../context/CategoryContext'
import { useTaskContext } from '../../context/TaskContext'
import { useUIContext } from '../../context/UIContext'
import { Feather, AntDesign } from '@expo/vector-icons'
import { Shadow } from 'react-native-shadow-2'
import { CustomModal } from './CustomModal'
import { CategoryList } from './CategoryList'

const guidelineBaseWidth = 375

export function EditTask() {
  const { selectedTask, editTask, removeTask } = useTaskContext()
  const { modals, toggleModal } = useUIContext()
  const { category } = useCategoryContext()
  const { width, height } = useWindowDimensions()

  // 🔹 Función responsiva como en AddTask
  const responsiveSize = (size) => (width / guidelineBaseWidth) * size

  const [editedTask, setEditedTask] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const maxLength = 130

  useEffect(() => {
    setEditedTask(selectedTask?.text || '')
    setSelectedCategory(selectedTask?.category)
  }, [selectedTask])

  useEffect(() => {
    setSelectedCategory(category)
  }, [category])

  const handleSaveTask = () => {
    if (!editedTask.trim()) return
    editTask(selectedTask.id, {
      text: editedTask,
      category: selectedCategory,
    })
    toggleModal('editTask')
  }

  const handleRemoveTask = () => {
    removeTask(selectedTask.id)
    toggleModal('editTask')
  }

  const styles = createStyles(responsiveSize, width, height)

  return (
    <CustomModal
      modalName="editTask"
      isOpen={modals?.editTask?.isOpen || false}
      onClose={() => toggleModal('editTask')}
      title="Editar Tarea"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalView}
      >
        <Text style={styles.charCount}>
          {editedTask.length}/{maxLength} caracteres
        </Text>

        <Shadow
          distance={3}
          startColor="rgba(0,0,0,.9)"
          finalColor="rgba(0,0,0,0)"
          offset={[0, 5]}
          radius={styles.borderRadius}
          containerViewStyle={{ marginBottom: responsiveSize(20) }}
        >
          <ImageBackground
            source={require('../../assets/notebook.jpg')}
            style={styles.inputBackground}
            imageStyle={{ borderRadius: styles.borderRadius }}
          >
            <TextInput
              value={editedTask}
              maxLength={maxLength}
              onChangeText={setEditedTask}
              onSubmitEditing={handleSaveTask}
              multiline
              placeholder="Edita tu tarea"
              style={styles.textInput}
              returnKeyType="done"
              placeholderTextColor="#666"
            />
          </ImageBackground>
        </Shadow>

        <Text style={styles.categoryText}>Categoría</Text>

        <Shadow
          distance={3}
          startColor="rgba(0,0,0,.9)"
          finalColor="rgba(0,0,0,0)"
          offset={[0, 1]}
          radius={styles.borderRadius}
        >
          <View style={styles.shadowContainer}>
            <CategoryList
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </View>
        </Shadow>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
            <Feather name="edit-2" size={styles.iconSize} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleRemoveTask}
          >
            <AntDesign name="delete" size={styles.iconSize} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Image
        source={require('../../assets/gatito1.png')}
        style={styles.gatito}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/tree.png')}
        style={styles.tree}
        resizeMode="contain"
      />
    </CustomModal>
  )
}

const createStyles = (responsiveSize, width, height) => {
  const inputWidth = width * 0.85
  const inputHeight = height * 0.22
  const buttonWidth = width * 0.34
  const buttonPadding = responsiveSize(14)
  const borderRadius = responsiveSize(10)
  const iconSize = responsiveSize(23)

  return StyleSheet.create({
    modalView: {
      borderRadius: responsiveSize(12),
      alignItems: 'stretch',
      zIndex: 1000,
      width: width * 0.86,
    },
    charCount: {
      textAlign: 'right',
      color: '#646464',
      marginBottom: responsiveSize(10),
      fontFamily: 'Geo_400Regular',
      fontSize: responsiveSize(17),
    },
    inputBackground: {
      borderWidth: responsiveSize(2.5),
      overflow: 'hidden',
      backgroundColor: 'transparent',
      width: inputWidth,
      minHeight: inputHeight,
      borderRadius,
    },
    textInput: {
      flex: 1,
      padding: responsiveSize(10),
      fontSize: responsiveSize(29),
      letterSpacing: 1.2,
      textAlignVertical: 'top',
      backgroundColor: 'transparent',
      color: '#000',
      fontFamily: 'Geo_400Regular',
    },
    shadowContainer: {
      backgroundColor: 'white',
      borderWidth: responsiveSize(2),
      borderColor: '#111',
      height: responsiveSize(60),
      marginBottom: responsiveSize(40),
      borderRadius,
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: responsiveSize(15),
      justifyContent: 'center',
    },
    categoryText: {
      color: '#000',
      textAlign: 'center',
      fontFamily: 'Geo_400Regular',
      fontSize: responsiveSize(19),
      marginTop: responsiveSize(20),
      marginBottom: responsiveSize(10),
    },
    saveButton: {
      alignSelf: 'center',
      backgroundColor: 'black',
      alignItems: 'center',
      width: buttonWidth,
      paddingVertical: buttonPadding,
      borderRadius: buttonWidth * 0.6,
    },
    deleteButton: {
      alignSelf: 'center',
      backgroundColor: '#ce0101',
      alignItems: 'center',
      width: buttonWidth,
      paddingVertical: buttonPadding,
      borderRadius: buttonWidth * 0.6,
    },
    iconSize,
    borderRadius,
    gatito: {
      width: responsiveSize(80),
      height: responsiveSize(80),
      position: 'absolute',
      bottom: responsiveSize(20),
      left: responsiveSize(40),
    },
    tree: {
      width: responsiveSize(90),
      height: responsiveSize(90),
      position: 'absolute',
      bottom: responsiveSize(20),
      right: responsiveSize(30),
    },
  })
}
