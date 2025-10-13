import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useUIContext } from '../context/UIContext'
import { useTaskContext } from '../context/TaskContext'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { Shadow } from 'react-native-shadow-2'

export function TaskControls() {
  const { toggleModal, showCompleted, setShowCompleted } = useUIContext()
  const { tasks } = useTaskContext()

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <View style={styles.container}>
      {/* Botón flotante para agregar tarea */}
      <Shadow
        distance={2}
        startColor="#202020"
        offset={[0, -2]}
        style={{ marginBottom: 15 }}
      >
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => toggleModal('addTask')}
        >
          <Entypo name="plus" size={28} color="black" />
        </TouchableOpacity>
      </Shadow>

      <View style={styles.toggleContainer}>
        <Shadow distance={10} startColor="#fff" offset={[0, 8]}>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowCompleted(!showCompleted)}
          >
            <Text style={styles.toggleText}>
              {showCompleted
                ? `Ocultar – ${completedCount}`
                : `Mostrar – ${completedCount}`}
            </Text>
            <AntDesign name="check" size={24} color="white" />
          </TouchableOpacity>
        </Shadow>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    zIndex: 20,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  floatingButton: {
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 50,
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 9,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  toggleText: {
    fontSize: 20,
    marginRight: 8,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Geo_400Regular',
  },
})
