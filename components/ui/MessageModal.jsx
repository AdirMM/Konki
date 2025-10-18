import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'
import { useTaskContext } from '../../context/TaskContext'
import { useUIContext } from '../../context/UIContext'
import { CustomModal } from './CustomModal'
import { Shadow } from 'react-native-shadow-2'

// 📱 Sistema responsivo igual que en AddTask
const { width, height } = Dimensions.get('window')
const guidelineBaseWidth = 375
const responsiveSize = (size) => (width / guidelineBaseWidth) * size

export function MessageModal({ messageText, showConfirm = true, onConfirm }) {
  const { modals, toggleModal } = useUIContext()
  const { hasCompletedTasks, deleteCompletedTask } = useTaskContext()

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
            source={require('../../assets/cloud.png')}
            style={[
              styles.cloud,
              { left: responsiveSize(10), top: responsiveSize(5) },
            ]}
          />
          <Image
            source={require('../../assets/cloud.png')}
            style={[
              styles.cloud,
              { right: responsiveSize(10), top: responsiveSize(35) },
            ]}
          />
          <Image
            source={require('../../assets/tree.png')}
            style={styles.tree}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/stickman.png')}
            style={styles.stickman}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/car.png')}
            style={styles.car}
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
    fontSize: responsiveSize(24),
    textAlign: 'center',
    marginBottom: responsiveSize(30),
    fontFamily: 'Geo_400Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: responsiveSize(20),
    marginBottom: responsiveSize(20),
  },
  button: {
    paddingVertical: responsiveSize(14),
    paddingHorizontal: responsiveSize(20),
    borderRadius: responsiveSize(40),
    alignItems: 'center',
    minWidth: responsiveSize(130),
  },
  backText: {
    fontSize: responsiveSize(22),
    color: '#fff',
    fontFamily: 'Geo_400Regular',
  },
  confirmButton: {
    backgroundColor: '#ab0000',
  },
  confirmText: {
    color: '#fff',
    fontFamily: 'Geo_400Regular',
    fontSize: responsiveSize(22),
  },
  imagesContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: responsiveSize(10),
  },
  cloud: {
    width: responsiveSize(170),
    height: responsiveSize(100),
    position: 'absolute',
  },
  tree: {
    width: responsiveSize(190),
    height: responsiveSize(220),
    position: 'absolute',
    top: responsiveSize(200),
    left: 0,
  },
  stickman: {
    width: responsiveSize(70),
    height: responsiveSize(70),
    position: 'absolute',
    top: responsiveSize(338),
    left: responsiveSize(100),
  },
  car: {
    width: responsiveSize(180),
    height: responsiveSize(220),
    position: 'absolute',
    top: responsiveSize(260),
    right: responsiveSize(20),
  },
})
