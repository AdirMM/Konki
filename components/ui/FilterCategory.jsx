import { Ionicons, Feather } from "@expo/vector-icons";
import { useState, useRef } from "react";
import {
  Pressable,
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { useCategoryContext } from "../../context/CategoryContext";
import { useTaskContext } from "../../context/TaskContext";
import {
  responsiveSize,
  responsiveVertical,
  responsiveFont,
} from "../../utils/responsive";

const { width, height } = Dimensions.get("window");

export function FilterCategory() {
  const [showFilter, setShowFilter] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;
  const { categories, setCategory } = useCategoryContext();
  const { tasks } = useTaskContext();

  const hasTasks = tasks.length > 0;

  const handleToggle = () => {
    const isOpening = !showFilter;
    setShowFilter(true);

    Animated.timing(animValue, {
      toValue: isOpening ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (!isOpening) setShowFilter(false);
    });
  };

  // Animaciones suaves y proporcionales al tamaño de pantalla
  const rotate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });

  const slideY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [responsiveVertical(-50), 0],
  });

  const slideX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [responsiveSize(50), 0],
  });

  const opacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleSelectCategory = (cat) => {
    if (!hasTasks && cat.name !== "Todas") return;
    setCategory(cat);
    handleToggle();
  };

  const renderItem = ({ item }) => {
    const isDisabled = !hasTasks && item.name !== "Todas";
    return (
      <Shadow
        distance={responsiveSize(6)}
        startColor="#000"
        offset={[0, responsiveSize(3)]}
      >
        <TouchableOpacity
          style={[styles.menuButton, { opacity: isDisabled ? 0.5 : 1 }]}
          onPress={() => handleSelectCategory(item)}
          disabled={isDisabled}
        >
          <View style={styles.buttonContent}>
            <Feather
              name={item.iconName}
              size={responsiveSize(20)}
              color={item.color}
            />
            <Text style={styles.buttonText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </Shadow>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Shadow
          distance={responsiveSize(5)}
          startColor="#000"
          offset={[0, responsiveSize(3)]}
        >
          <Pressable onPress={handleToggle}>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Ionicons name="filter" size={responsiveSize(38)} color="white" />
            </Animated.View>
          </Pressable>
        </Shadow>
      </View>

      {showFilter && (
        <>
          <Pressable style={styles.backdrop} onPress={handleToggle} />

          <Animated.View
            style={[
              styles.dropdown,
              {
                opacity,
                transform: [{ translateY: slideY }, { translateX: slideX }],
              },
            ]}
          >
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollContent}
              style={styles.scrollContainer}
              removeClippedSubviews
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={3}
            />
          </Animated.View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { position: "relative", zIndex: 1 },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "transparent",
    zIndex: 999,
  },
  dropdown: {
    position: "absolute",
    top: height * 0.1,
    right: responsiveSize(-10),
    zIndex: 1000,
    maxHeight: height * 0.5,
    borderRadius: responsiveSize(12),
    overflow: "hidden",
  },
  scrollContainer: {
    width: width * 0.45,
    borderRadius: responsiveSize(12),
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: responsiveVertical(20),
  },
  menuButton: {
    width: width * 0.4,
    height: responsiveVertical(60),
    justifyContent: "center",
    borderWidth: responsiveSize(2),
    borderRadius: responsiveSize(12),
    marginBottom: responsiveVertical(20),
    paddingHorizontal: responsiveSize(18),
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSize(10),
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: responsiveFont(18),
    fontFamily: "Geo_400Regular_Italic",
  },
});
