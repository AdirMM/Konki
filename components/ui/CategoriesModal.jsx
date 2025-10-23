import { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Solo para las flechas
import { useUIContext } from "../../context/UIContext";
import { useCategoryContext } from "../../context/CategoryContext";
import { CustomModal } from "./CustomModal";
import { Shadow } from "react-native-shadow-2";
import { responsiveSize, responsiveVertical } from "../../utils/responsive";
import { iconMap } from "../../utils/icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const columns = 2;
const horizontalPadding = 16 * (columns - 1);
const itemWidth = (screenWidth * 0.8 - horizontalPadding) / columns;

export function CategoriesModal() {
  const { modals, toggleModal, setSelectedCategory } = useUIContext();
  const { categories } = useCategoryContext();
  const [showArrow, setShowArrow] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);

  const handleClick = (cat) => {
    setSelectedCategory(cat);
    toggleModal("categories");
    setTimeout(() => {
      toggleModal("category");
    }, 300);
  };

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    if (contentHeight > screenHeight * 0.38) {
      if (!showArrow) {
        setShowArrow(true);
        Animated.loop(
          Animated.sequence([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }
    } else {
      setShowArrow(false);
      fadeAnim.setValue(0);
    }
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const endReached =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 10;
    setIsAtEnd(endReached);
  };

  const handleArrowPress = () => {
    if (isAtEnd && scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
      setIsAtEnd(false);
    } else if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  };

  const renderIcon = (cat) => {
    const IconComponent = iconMap[cat.iconName];
    if (!IconComponent) return null;
    return (
      <IconComponent size={responsiveSize(20)} color={cat.color || "#fff"} />
    );
  };

  const styles = createStyles(itemWidth);

  return (
    <CustomModal
      modalName="categories"
      isOpen={modals?.categories?.isOpen || false}
      onClose={() => toggleModal("categories")}
      title="Categorías"
    >
      <View style={styles.modalView}>
        <Text style={styles.note}>
          Nota: Si quieres editar una categoría da click sobre ella ;)
        </Text>

        <ScrollView
          ref={scrollRef}
          style={{ maxHeight: screenHeight * 0.38, width: "100%" }}
          contentContainerStyle={styles.gridContainer}
          onContentSizeChange={handleContentSizeChange}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {categories
            .filter((cat) => cat.id !== "todas")
            .slice(1)
            .map((cat, index) => {
              const isDisabled = index < 4;
              return (
                <View key={cat.id} style={{ width: itemWidth }}>
                  <Shadow
                    distance={8}
                    startColor="#000"
                    offset={[0, 5]}
                    style={{ flex: 1 }}
                  >
                    <TouchableOpacity
                      onPress={() => !isDisabled && handleClick(cat)}
                      activeOpacity={isDisabled ? 0.5 : 1}
                      style={[
                        styles.categoryItem,
                        { flex: 1, opacity: isDisabled ? 0.5 : 1 },
                      ]}
                    >
                      <View style={styles.buttonContent}>
                        {renderIcon(cat)}
                        <Text style={styles.categoryText}>{cat.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </Shadow>
                </View>
              );
            })}
        </ScrollView>

        {showArrow && (
          <Animated.View>
            <Shadow
              distance={5}
              startColor="#000"
              offset={[0, 8]}
              style={styles.arrowShadow}
            >
              <TouchableOpacity onPress={handleArrowPress}>
                <Animated.View
                  style={[styles.arrowContainer, { opacity: fadeAnim }]}
                >
                  <Feather
                    name={isAtEnd ? "chevron-up" : "chevron-down"}
                    size={responsiveSize(40)}
                    color="#fff"
                  />
                </Animated.View>
              </TouchableOpacity>
            </Shadow>
          </Animated.View>
        )}
      </View>

      {/* Imágenes decorativas */}
      <Image
        source={require("../../assets/island3.png")}
        style={{
          width: responsiveSize(220),
          height: responsiveSize(220),
          alignSelf: "center",
          position: "absolute",
          bottom: responsiveVertical(35),
          right: 0,
        }}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/airplane1.png")}
        style={{
          width: responsiveSize(90),
          height: responsiveSize(90),
          alignSelf: "center",
          position: "absolute",
          bottom: responsiveVertical(180),
          left: responsiveSize(30),
        }}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/shark.png")}
        style={{
          width: responsiveSize(70),
          height: responsiveSize(70),
          alignSelf: "center",
          position: "absolute",
          bottom: responsiveVertical(30),
          left: responsiveSize(70),
        }}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/cloud.png")}
        style={{
          width: responsiveSize(110),
          height: responsiveSize(110),
          alignSelf: "center",
          position: "absolute",
          bottom: responsiveVertical(300),
          left: responsiveSize(50),
        }}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/cloud.png")}
        style={{
          width: responsiveSize(110),
          height: responsiveSize(110),
          alignSelf: "center",
          position: "absolute",
          bottom: responsiveVertical(300),
          left: responsiveSize(240),
        }}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/globe.png")}
        style={{
          width: responsiveSize(65),
          height: responsiveSize(65),
          alignSelf: "center",
          position: "absolute",
          top: responsiveVertical(-50),
          left: responsiveSize(45),
        }}
        resizeMode="contain"
      />
    </CustomModal>
  );
}

const createStyles = (itemWidth) =>
  StyleSheet.create({
    modalView: {
      width: "85%",
      alignSelf: "center",
      borderRadius: responsiveSize(12),
      zIndex: 1000,
      alignItems: "center",
    },
    note: {
      textAlign: "center",
      color: "#000",
      fontSize: responsiveSize(20),
      fontFamily: "Geo_400Regular",
      marginBottom: responsiveVertical(25),
    },
    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingHorizontal: responsiveSize(4),
      gap: responsiveSize(10),
    },
    categoryItem: {
      width: itemWidth,
      height: responsiveVertical(55),
      justifyContent: "center",
      borderWidth: responsiveSize(2),
      borderRadius: responsiveSize(10),
      padding: responsiveSize(10),
      marginBottom: responsiveVertical(16),
      borderColor: "#000",
    },
    buttonContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: responsiveSize(5),
    },
    categoryText: {
      fontSize: responsiveSize(22),
      fontFamily: "Geo_400Regular",
      color: "#fff",
    },
    arrowContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: responsiveSize(4),
    },
    arrowShadow: {
      marginTop: responsiveVertical(10),
      alignSelf: "center",
    },
  });
