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

const { width, height } = Dimensions.get("window");

export function Menu() {
  const [actionMenu, setActionMenu] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(-40)).current;
  const slideX = useRef(new Animated.Value(-40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const { toggleModal } = useUIContext();

  const handleToggleMenu = () => {
    const isOpening = !actionMenu;

    Animated.timing(rotateAnim, {
      toValue: isOpening ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

    if (isOpening) {
      setActionMenu(true);
      Animated.parallel([
        Animated.timing(slideY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(slideX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideY, {
          toValue: -40,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(slideX, {
          toValue: -40,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => setActionMenu(false));
    }
  };

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View style={{ position: "relative", zIndex: 100 }}>
      {/* Botón de menú */}
      <Shadow distance={5} startColor="#000" offset={[0, 1]}>
        <Pressable onPress={handleToggleMenu}>
          <Animated.View
            style={{ transform: [{ rotate: rotateInterpolation }] }}
          >
            <Feather
              name="menu"
              size={width * 0.1} // tamaño proporcional
              color="white"
            />
          </Animated.View>
        </Pressable>
      </Shadow>

      {actionMenu && (
        <>
          {/* Fondo para cerrar el menú al tocar fuera */}
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width,
              height,
              backgroundColor: "transparent",
              zIndex: 49,
            }}
            onPress={handleToggleMenu}
          />

          {/* Menú flotante */}
          <Animated.View
            style={[
              styles.menu,
              {
                opacity: opacityAnim,
                transform: [{ translateY: slideY }, { translateX: slideX }],
              },
            ]}
          >
            <Shadow distance={5} startColor="#000" offset={[0, 3]}>
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

            <Shadow distance={5} startColor="#ab0000" offset={[0, 3]}>
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    width: width * 0.6, // 60% del ancho total
    position: "absolute",
    top: height * 0.09, // 9% desde arriba
    zIndex: 100,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  menuButton: {
    height: height * 0.075, // 7.5% de la altura
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: height * 0.015,
    paddingHorizontal: width * 0.04,
  },
  deleteButton: {
    borderColor: "#ab0000",
  },
  buttonText: {
    fontSize: width * 0.055, // escala con el ancho de pantalla
    color: "#fff",
    textAlign: "center",
    fontFamily: "Geo_400Regular_Italic",
  },
});
