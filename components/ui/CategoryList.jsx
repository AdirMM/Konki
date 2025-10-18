import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useCategoryContext } from '../../context/CategoryContext'

export function CategoryList({ selected, onSelect }) {
  const {
    categories,
    category: globalCategory,
    setCategory: setGlobalCategory,
  } = useCategoryContext()

  const selectedCategory = selected ?? globalCategory
  const handleClick = (cat) => {
    if (onSelect) {
      onSelect(cat)
    } else {
      setGlobalCategory(cat)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((cat) => {
          const iconName = cat.iconName || 'layers'
          const isSelected = selectedCategory?.name === cat.name

          return (
            <TouchableOpacity
              key={cat.id}
              onPress={() => handleClick(cat)}
              style={[
                styles.categoryItem,
                isSelected ? styles.selectedItem : styles.unselectedItem,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.categoryContent}>
                <Feather
                  name={iconName}
                  size={18}
                  color={cat.color || 'black'}
                />
                <Text
                  style={[
                    styles.categoryText,
                    isSelected ? styles.selectedText : styles.unselectedText,
                  ]}
                >
                  {cat.name}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    paddingVertical: 4,
  },
  scrollContainer: {
    paddingHorizontal: 8,
  },
  categoryItem: {
    minWidth: 70,
    height: 45,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    borderColor: 'black',
    backgroundColor: '#000000',
  },
  unselectedItem: {
    backgroundColor: '#f2f2f2',
    borderColor: '#fff',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryText: {
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'Geo_400Regular',
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: 'black',
  },
})
