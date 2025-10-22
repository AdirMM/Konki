import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useUIContext } from "../../context/UIContext";
import { Shadow } from "react-native-shadow-2";
import { responsiveSize, responsiveVertical } from "../../utils/responsive";

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(responsiveVertical(-40))).current;
  const slideX = useRef(new Animated.Value(responsiveSize(-40))).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const { toggleModal } = useUIContext();

  const handleToggleMenu = () => {
    const opening = !isMenuOpen;

    // Animación del ícono
    Animated.timing(rotateAnim, {
      toValue: opening ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // Animación del menú
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

    // Actualizamos solo el estado de interacción después de la animación
    setIsMenuOpen(opening);
  };

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "180deg"],
  });

  return (
    <View style={{ position: "relative", zIndex: 100 }}>
      {/* Botón de menú */}
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

      {/* Menú flotante */}
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
        {/* Fondo para cerrar al tocar fuera */}
        {isMenuOpen && (
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleToggleMenu}
          />
        )}

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
            <Text style={styles.buttonText}>Ver Categorías</Text>
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
            <Text style={styles.buttonText}>Eliminar completadas</Text>
          </TouchableOpacity>
        </Shadow>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    width: responsiveSize(220),
    position: "absolute",
    top: responsiveVertical(70),
    zIndex: 100,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  menuButton: {
    height: responsiveVertical(60),
    justifyContent: "center",
    borderWidth: responsiveSize(2),
    borderRadius: responsiveSize(12),
    marginBottom: responsiveVertical(12),
    paddingHorizontal: responsiveSize(15),
  },
  deleteButton: {
    borderColor: "#ab0000",
  },
  buttonText: {
    fontSize: responsiveSize(18),
    color: "#fff",
    textAlign: "center",
    fontFamily: "Geo_400Regular_Italic",
  },
});
