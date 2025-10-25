import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useUIContext } from "../context/UIContext";
import { Entypo } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { responsiveSize, responsiveVertical } from "../utils/responsive"; // ✅ Usamos tus funciones responsive

export function AddTaskButton() {
  const { toggleModal } = useUIContext();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: responsiveVertical(20) + insets.bottom },
      ]}
    >
      {/* Botón flotante para agregar tarea */}
      <Shadow
        distance={5}
        startColor="#000"
        offset={[0, 2]}
        style={{ marginBottom: responsiveVertical(15) }}
      >
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => toggleModal("addTask")}
          activeOpacity={0.85}
        >
          <Entypo name="plus" size={responsiveSize(28)} color="black" />
        </TouchableOpacity>
      </Shadow>

      {/* Imagen del gato debajo del botón */}
      <Image
        source={require("../assets/cat.png")}
        style={styles.cat}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -responsiveVertical(65),
    zIndex: 20,
    width: "100%",
    alignItems: "center",
  },
  floatingButton: {
    padding: responsiveSize(20),
    backgroundColor: "white",
    borderWidth: responsiveSize(2),
    borderColor: "#000",
    borderRadius: responsiveSize(50),
    marginBottom: responsiveVertical(10),
  },
  cat: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    transform: [{ rotate: "180deg" }],
    marginTop: responsiveVertical(-18),
    marginBottom: responsiveVertical(10),
  },
});
