import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useUIContext } from "../../context/UIContext";
import { Shadow } from "react-native-shadow-2";
import { responsiveSize, responsiveVertical } from "../../utils/responsive";

const { width, height } = Dimensions.get("window");

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(responsiveVertical(-40))).current;
  const slideX = useRef(new Animated.Value(responsiveSize(-40))).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const { toggleModal } = useUIContext();

  const handleToggleMenu = () => {
    const opening = !isMenuOpen;

    Animated.timing(rotateAnim, {
      toValue: opening ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(slideY, {
        toValue: opening ? 0 : responsiveVertical(-40),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(slideX, {
        toValue: opening ? 0 : responsiveSize(-40),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: opening ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();

    setIsMenuOpen(opening);
  };

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "180deg"],
  });

  return (
    <>
      <View style={{ position: "relative", zIndex: 1 }}>
        <Shadow
          distance={5}
          startColor="#000"
          offset={[0, responsiveVertical(1)]}
        >
          <Pressable onPress={handleToggleMenu}>
            <Animated.View
              style={{ transform: [{ rotate: rotateInterpolation }] }}
            >
              <Feather
                name="more-vertical"
                size={responsiveSize(38)}
                color="white"
              />
            </Animated.View>
          </Pressable>
        </Shadow>
      </View>

      {/* 🔹 Cerrar al tocar fuera (sin cambiar diseño) */}
      {isMenuOpen && (
        <Pressable style={styles.backdrop} onPress={handleToggleMenu} />
      )}

      <Animated.View
        style={[
          styles.menu,
          {
            opacity: opacityAnim,
            transform: [{ translateY: slideY }, { translateX: slideX }],
            pointerEvents: isMenuOpen ? "auto" : "none",
          },
        ]}
      >
        <Shadow
          distance={5}
          startColor="#000"
          offset={[0, responsiveVertical(3)]}
        >
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              toggleModal("category");
              handleToggleMenu();
            }}
          >
            <Text style={styles.buttonText}>Nueva Categoría</Text>
          </TouchableOpacity>
        </Shadow>

        <Shadow
          distance={5}
          startColor="#000"
          offset={[0, responsiveVertical(3)]}
        >
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              toggleModal("categories");
              handleToggleMenu();
            }}
          >
            <Text style={styles.buttonText}>Todas las Categorías</Text>
          </TouchableOpacity>
        </Shadow>

        <Shadow
          distance={5}
          startColor="#ab0000"
          offset={[0, responsiveVertical(3)]}
        >
          <TouchableOpacity
            style={[styles.menuButton, styles.deleteButton]}
            onPress={() => {
              toggleModal("message");
              handleToggleMenu();
            }}
          >
            <Text style={styles.buttonText}>Eliminar Tareas Completadas</Text>
          </TouchableOpacity>
        </Shadow>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "transparent",
    zIndex: 999,
  },
  menu: {
    position: "absolute",
    top: responsiveVertical(103),
    zIndex: 1000,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  menuButton: {
    height: responsiveVertical(65),
    justifyContent: "center",
    borderWidth: responsiveSize(2),
    borderRadius: responsiveSize(12),
    marginBottom: responsiveVertical(12),
    padding: responsiveSize(15),
  },
  deleteButton: {
    borderColor: "#ab0000",
  },
  buttonText: {
    fontSize: responsiveSize(18),
    color: "#fff",
    fontFamily: "Geo_400Regular_Italic",
  },
});
