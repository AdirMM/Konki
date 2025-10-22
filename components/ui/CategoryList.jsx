import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCategoryContext } from "../../context/CategoryContext";
import {
  responsiveSize,
  responsiveVertical,
  responsiveFont,
} from "../../utils/responsive";

export function CategoryList({ selected, onSelect }) {
  const {
    categories,
    category: globalCategory,
    setCategory: setGlobalCategory,
  } = useCategoryContext();

  const selectedCategory = selected ?? globalCategory;

  const handleClick = (cat) => {
    if (onSelect) {
      onSelect(cat);
    } else {
      setGlobalCategory(cat);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((cat) => {
          const iconName = cat.iconName || "layers";
          const isSelected = selectedCategory?.name === cat.name;

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
                  size={responsiveSize(18)}
                  color={cat.color || "black"}
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
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    paddingVertical: responsiveVertical(4),
  },
  scrollContainer: {
    paddingHorizontal: responsiveSize(8),
  },
  categoryItem: {
    minWidth: responsiveSize(70),
    height: responsiveSize(45),
    paddingVertical: responsiveVertical(8),
    paddingHorizontal: responsiveSize(12),
    borderRadius: responsiveSize(8),
    marginRight: responsiveSize(8),
    justifyContent: "center",
    alignItems: "center",
  },
  selectedItem: {
    borderColor: "black",
    backgroundColor: "#000000",
  },
  unselectedItem: {
    backgroundColor: "#f2f2f2",
    borderColor: "#fff",
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSize(4),
  },
  categoryText: {
    fontSize: responsiveFont(20),
    letterSpacing: responsiveSize(1),
    fontFamily: "Geo_400Regular",
  },
  selectedText: {
    color: "white",
  },
  unselectedText: {
    color: "black",
  },
});
