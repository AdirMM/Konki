import { Feather } from '@expo/vector-icons'

export const iconMap = {
  home: (props) => <Feather name="home" {...props} />, // Hogar
  'shopping-cart': (props) => <Feather name="shopping-cart" {...props} />, // Compras
  briefcase: (props) => <Feather name="briefcase" {...props} />, // Trabajo
  book: (props) => <Feather name="book" {...props} />, // Estudio / lectura
  calendar: (props) => <Feather name="calendar" {...props} />, // Eventos / citas
  heart: (props) => <Feather name="heart" {...props} />, // Salud / autocuidado
  clock: (props) => <Feather name="clock" {...props} />, // Pendientes por hora
  tool: (props) => <Feather name="tool" {...props} />, // Reparaciones / mantenimiento
  truck: (props) => <Feather name="truck" {...props} />, // Envíos / logística
  film: (props) => <Feather name="film" {...props} />, // Películas / entretenimiento
  map: (props) => <Feather name="map" {...props} />, // Salidas / recorridos
  gift: (props) => <Feather name="gift" {...props} />, // Regalos / celebraciones
}

export const iconList = Object.keys(iconMap).map((key) => ({
  name: key,
  component: iconMap[key],
}))
