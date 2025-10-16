import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const guidelineBaseWidth = 375

export const responsiveSize = (size) => (width / guidelineBaseWidth) * size
