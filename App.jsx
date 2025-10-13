import AppContent from './AppContent'
import { CategoryProvider } from './context/CategoryContext'
import { TaskProvider } from './context/TaskContext'
import { UIProvider } from './context/UIContext'
import {
  useFonts,
  Geo_400Regular,
  Geo_400Regular_Italic,
} from '@expo-google-fonts/geo'
import { View, StatusBar } from 'react-native'

export default function App() {
  // Cargar las fuentes necesarias
  const [fontsLoaded, fontsError] = useFonts({
    Geo_400Regular,
    Geo_400Regular_Italic,
  })

  // Mostrar un indicador de carga mientras se cargan las fuentes
  if (!fontsLoaded && !fontsError) {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      ></View>
    )
  }

  // Si ocurre un error cargando las fuentes, mostrar un mensaje en lugar de crashear
  if (fontsError) {
    console.warn('Error cargando las fuentes:', fontsError)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No se pudieron cargar las fuentes. Reinicia la app.</Text>
      </View>
    )
  }

  // Renderizar la aplicación solo cuando las fuentes estén listas
  return (
    <>
      {/* StatusBar configurado al inicio */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />

      <CategoryProvider>
        <TaskProvider>
          <UIProvider>
            <AppContent />
          </UIProvider>
        </TaskProvider>
      </CategoryProvider>
    </>
  )
}
