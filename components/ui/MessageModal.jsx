import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useTaskContext } from '../../context/TaskContext'
import { useUIContext } from '../../context/UIContext'
import { CustomModal } from './CustomModal'
import { Shadow } from 'react-native-shadow-2'

export function MessageModal() {
  const { modals, toggleModal } = useUIContext()
  const { hasCompletedTasks, deleteCompletedTask } = useTaskContext()

  return (
    <CustomModal
      modalName="message"
      isOpen={modals?.message?.isOpen || false}
      onClose={() => toggleModal('message')}
      title="Mensaje..."
    >
      <Text style={styles.message}>
        {hasCompletedTasks
          ? '¿Estás seguro de eliminar todas las tareas completadas?'
          : 'No existen tareas completadas'}
      </Text>

      <View style={styles.buttonRow}>
        <Shadow
          distance={3}
          startColor="rgba(0,0,0,0.9)"
          finalColor="rgba(0,0,0,0)"
          offset={[0, 5]}
          radius={10}
        >
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => toggleModal('message')}
          >
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </Shadow>

        {hasCompletedTasks && (
          <Shadow
            distance={3}
            startColor="rgba(0,0,0,0.9)"
            finalColor="rgba(0,0,0,0)"
            offset={[0, 5]}
            radius={10}
          >
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => {
                deleteCompletedTask()
                toggleModal('message')
              }}
            >
              <Text style={styles.confirmText}>Estoy seguro</Text>
            </TouchableOpacity>
          </Shadow>
        )}

        {/* Imágenes decorativas */}
        <Image
          source={require('../../assets/flower.png')}
          style={{
            width: 160,
            height: 160,
            alignSelf: 'center',
            position: 'absolute',
            top: 120,
            right: -40,
          }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/gatito6.png')}
          style={{
            width: 140,
            height: 140,
            alignSelf: 'center',
            position: 'absolute',
            top: 120,
            left: -15,
          }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/gatito2.png')}
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
            position: 'absolute',
            top: 310,
            right: -15,
          }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/gym.png')}
          style={{
            width: 80,
            height: 80,
            alignSelf: 'center',
            position: 'absolute',
            top: 440,
            right: -15,
          }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/tree.png')}
          style={{
            width: 190,
            height: 170,
            alignSelf: 'center',
            position: 'absolute',
            top: 330,
            left: -35,
          }}
          resizeMode="contain"
        />
      </View>
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  message: {
    width: '90%',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 40,
    alignItems: 'center',
    minWidth: 130,
  },
  backButton: {
    borderWidth: 1,
  },
  backText: {
    fontSize: 19,
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#ce0101',
  },
  confirmText: {
    color: '#fff',
    fontSize: 19,
  },
})
