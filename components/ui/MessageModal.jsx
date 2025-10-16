import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useTaskContext } from '../../context/TaskContext'
import { useUIContext } from '../../context/UIContext'
import { CustomModal } from './CustomModal'
import { Shadow } from 'react-native-shadow-2'

export function MessageModal({ messageText, showConfirm = true, onConfirm }) {
  const { modals, toggleModal } = useUIContext()
  const { hasCompletedTasks, deleteCompletedTask } = useTaskContext()

  // Texto y comportamiento por defecto si no se pasan props
  const defaultText = hasCompletedTasks
    ? '¿Estás seguro de eliminar todas las tareas completadas?'
    : 'No existen tareas completadas'

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    } else if (hasCompletedTasks) {
      deleteCompletedTask()
    }
    toggleModal('message')
  }

  return (
    <CustomModal
      modalName="message"
      isOpen={modals?.message?.isOpen || false}
      onClose={() => toggleModal('message')}
      title="Mensaje..."
    >
      <View style={styles.centerContainer}>
        <Text style={styles.message}>{messageText || defaultText}</Text>

        <View style={styles.buttonRow}>
          <Shadow distance={5} startColor="#000" offset={[0, 3]} radius={10}>
            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              onPress={() => toggleModal('message')}
            >
              <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>
          </Shadow>

          {showConfirm && (hasCompletedTasks || onConfirm) && (
            <Shadow
              distance={5}
              startColor="#ab0000"
              offset={[0, 3]}
              radius={10}
            >
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmText}>Estoy seguro</Text>
              </TouchableOpacity>
            </Shadow>
          )}
        </View>

        {/* Imágenes decorativas centradas */}
        <View style={styles.imagesContainer}>
          <Image
            source={require('../../assets/flower.png')}
            style={styles.flower}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/gatito6.png')}
            style={styles.gatito6}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/gatito2.png')}
            style={styles.gatito2}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/gym.png')}
            style={styles.gym}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/tree.png')}
            style={styles.tree}
            resizeMode="contain"
          />
        </View>
      </View>
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  centerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  message: {
    width: '90%',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Geo_400Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 40,
    alignItems: 'center',
    minWidth: 130,
  },
  backText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Geo_400Regular',
  },
  confirmButton: {
    backgroundColor: '#ab0000',
  },
  confirmText: {
    color: '#fff',
    fontFamily: 'Geo_400Regular',
    fontSize: 22,
  },
  imagesContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 10,
  },
  flower: {
    width: 130,
    height: 130,
    position: 'absolute',
    top: 100,
    right: -40,
  },
  gatito6: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: 50,
    right: 60,
  },
  gatito2: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: 50,
    left: 60,
  },
  gym: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: 180,
    left: 40,
  },
  tree: {
    width: 190,
    height: 170,
    position: 'absolute',
    top: 120,
    right: 20,
  },
})
