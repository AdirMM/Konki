import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Animated,
  FlatList,
  Pressable,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { CustomModal } from "./CustomModal";
import { CustomButton } from "./CustomButton";
import { iconList } from "../../utils/icons";
import { useUIContext } from "../../context/UIContext";
import { useCategoryContext } from "../../context/CategoryContext";
import { responsiveSize, responsiveVertical } from "../../utils/responsive";

export function CategoryModal() {
  const { addCategory, updateCategory, deleteCategory } = useCategoryContext();
  const {
    modals,
    toggleModal,
    selectedCategory,
    setSelectedCategory,
    switchModal,
  } = useUIContext();

  const [newCategory, setNewCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [iconError, setIconError] = useState(false);
  const [showError, setShowError] = useState(false);

  // Popups
  const [showColors, setShowColors] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const colorAnim = useRef(new Animated.Value(0)).current;
  const iconAnim = useRef(new Animated.Value(0)).current;

  const colors = [
    "#3b82f6",
    "#22c55e",
    "#ef4444",
    "#eab308",
    "#a855f7",
    "#0ea5e9",
    "#f97316",
    "#10b981",
    "#6366f1",
    "#f24ace",
  ];

  const togglePopup = (type) => {
    if (type === "color") {
      const isOpening = !showColors;
      setShowIcons(false); // cerrar icon popup si está abierto
      if (isOpening) {
        colorAnim.setValue(0); // reinicia animación
        setShowColors(true);
      }
      animatePopup(colorAnim, isOpening);
    } else if (type === "icon") {
      const isOpening = !showIcons;
      setShowColors(false); // cerrar color popup si está abierto
      if (isOpening) {
        iconAnim.setValue(0); // reinicia animación
        setShowIcons(true);
      }
      animatePopup(iconAnim, isOpening);
    }
  };

  const animatePopup = (animRef, open) => {
    Animated.timing(animRef, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (!open) {
        requestAnimationFrame(() => {
          if (animRef === colorAnim) setShowColors(false);
          if (animRef === iconAnim) setShowIcons(false);
        });
      }
    });
  };

  useEffect(() => {
    if (selectedCategory) {
      setNewCategory(selectedCategory.name);
      setSelectedColor(selectedCategory.color);
      setSelectedIcon(selectedCategory.iconName);
      setIconError(false);
    } else {
      setNewCategory("");
      setSelectedColor("#3b82f6");
      setSelectedIcon("");
      setIconError(false);
    }
  }, [selectedCategory]);

  const handleCategory = () => {
    // si falta nombre -> mostrar error
    if (newCategory.trim() === "") {
      setShowError(true);
      // opcional: quitar iconError si estaba activo
      setIconError(false);
      return;
    }

    // si falta ícono -> marcar error de ícono y mostrar caja de error
    if (!selectedIcon) {
      setIconError(true);
      setShowError(true);
      return;
    }

    // si todo ok -> crear/actualizar
    if (selectedCategory) {
      const updatedCat = {
        ...selectedCategory,
        name: newCategory,
        color: selectedColor,
        iconName: selectedIcon,
      };
      updateCategory(updatedCat);
      setSelectedCategory(updatedCat);
      switchModal("category", "categories");
    } else {
      const newCat = {
        name: newCategory,
        color: selectedColor,
        iconName: selectedIcon,
      };
      addCategory(newCat);
      switchModal("category", "categories");
    }

    // limpiar estados
    setNewCategory("");
    setSelectedColor("#3b82f6");
    setSelectedIcon("");
    setSelectedCategory(null);
    setIconError(false);
    setShowError(false);
  };

  const handleDelete = () => {
    if (!selectedCategory) return;
    deleteCategory(selectedCategory.id);
    setSelectedCategory(null); // ✅ Limpia la selección
    switchModal("category", "categories");
  };

  return (
    <CustomModal
      modalName="category"
      isOpen={modals?.category?.isOpen || false}
      onClose={() => {
        toggleModal("category");
        setSelectedCategory(null);
        setNewCategory("");
        setSelectedColor("#3b82f6");
        setSelectedIcon("");
        setIconError(false);
        setShowError(false); // <- añadir
      }}
      title="Categoría"
    >
      <View style={styles.container}>
        <Text style={styles.label}>Nombre</Text>
        <Shadow
          distance={3}
          startColor="rgba(0,0,0,.9)"
          finalColor="rgba(0,0,0,0)"
          offset={[0, 5]}
          radius={10}
          containerViewStyle={{ marginBottom: responsiveSize(20) }}
        >
          <ImageBackground
            source={require("../../assets/notebook.jpg")}
            style={styles.inputBackground}
            imageStyle={{ borderRadius: responsiveSize(10) }}
          >
            <TextInput
              style={styles.textInput}
              placeholder="Ej. Compras, Familia..."
              placeholderTextColor="#666"
              value={newCategory}
              maxLength={10}
              onChangeText={(text) => {
                setNewCategory(text);
                if (text.trim()) setShowError(false);
              }}
              returnKeyType="done"
            />
          </ImageBackground>
        </Shadow>

        {/* --- Selector Color e Icono --- */}
        <View style={styles.selectorRow}>
          {/* Selector Color */}
          <View style={styles.selectorContainer}>
            <Text style={styles.label}>Color</Text>
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: selectedColor }]}
              onPress={() => togglePopup("color")}
            />
            {showColors && (
              <Animated.View
                pointerEvents={showColors ? "auto" : "none"}
                style={{
                  width: responsiveSize(195),
                  position: "absolute",
                  top: responsiveSize(105),
                  left: responsiveSize(-51),
                  zIndex: 50,
                  backgroundColor: "#000",
                  padding: responsiveSize(2),
                  borderRadius: responsiveSize(10),
                  transform: [
                    {
                      scale: colorAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                  opacity: colorAnim,
                }}
              >
                <FlatList
                  data={colors}
                  keyExtractor={(item) => item}
                  numColumns={5}
                  renderItem={({ item }) => (
                    <Pressable
                      style={[styles.colorOption, { backgroundColor: item }]}
                      onPress={() => {
                        setSelectedColor(item);
                        setShowError(false);
                        animatePopup(colorAnim, false);
                      }}
                    />
                  )}
                />
              </Animated.View>
            )}
          </View>

          {/* Selector Icono */}
          <View style={styles.selectorContainer}>
            <Text style={styles.label}>Ícono</Text>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => togglePopup("icon")}
            >
              {selectedIcon ? (
                (() => {
                  const IconComp = iconList.find(
                    (i) => i.name === selectedIcon
                  )?.component;
                  return IconComp ? (
                    <IconComp size={responsiveSize(28)} color="#fff" />
                  ) : (
                    <Feather
                      name="help-circle"
                      size={responsiveSize(28)}
                      color="#fff"
                    />
                  );
                })()
              ) : (
                <Feather name="plus" size={responsiveSize(28)} color="#fff" />
              )}
            </TouchableOpacity>
            {showIcons && (
              <Animated.View
                pointerEvents={showIcons ? "auto" : "none"}
                style={{
                  width: responsiveSize(222),
                  position: "absolute",
                  top: responsiveSize(105),
                  left: responsiveSize(-50),
                  zIndex: 50,
                  backgroundColor: "#000",
                  padding: responsiveSize(2),
                  borderRadius: responsiveSize(10),
                  transform: [
                    {
                      scale: iconAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                  opacity: iconAnim,
                }}
              >
                <FlatList
                  data={iconList}
                  keyExtractor={(item) => item.name}
                  numColumns={5}
                  renderItem={({ item }) => {
                    const IconComp = item.component;
                    return (
                      <Pressable
                        style={styles.iconOption}
                        onPress={() => {
                          setSelectedIcon(item.name);
                          setIconError(false);
                          setShowError(false);
                          animatePopup(iconAnim, false);
                        }}
                      >
                        <IconComp size={responsiveSize(23)} color="#fff" />
                      </Pressable>
                    );
                  }}
                />
              </Animated.View>
            )}
          </View>
        </View>

        {/* --- Mensaje de error --- */}
        {showError &&
          (!newCategory.trim() || !selectedIcon || !selectedColor) && (
            <Animated.View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {!newCategory.trim()
                  ? "Por favor nombra la categoría"
                  : !selectedIcon
                  ? "Por favor selecciona un ícono"
                  : "Por favor selecciona un color"}
              </Text>
            </Animated.View>
          )}

        {/* --- Botones --- */}
        <View style={styles.buttonsContainer}>
          {selectedCategory && (
            <CustomButton
              icon={
                <AntDesign
                  name="delete"
                  size={responsiveSize(22)}
                  color="white"
                />
              }
              color="#ce0101"
              onPress={handleDelete}
            />
          )}
          <CustomButton
            icon={
              selectedCategory ? (
                <Feather
                  name="edit-2"
                  size={responsiveSize(22)}
                  color="white"
                />
              ) : (
                <Entypo name="plus" size={responsiveSize(28)} color="white" />
              )
            }
            color="black"
            onPress={handleCategory}
          />
        </View>

        {/* Imágenes decorativas */}
        <Image
          source={require("../../assets/camp.png")}
          style={styles.camp}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/cloud.png")}
          style={[styles.cloudImage, { left: responsiveSize(-40) }]}
        />
        <Image
          source={require("../../assets/cloud.png")}
          style={[styles.cloudImage, { right: responsiveSize(-40) }]}
        />
        <Image
          source={require("../../assets/airplane1.png")}
          style={[styles.airplane1]}
        />
        <Image
          source={require("../../assets/hornet.png")}
          style={styles.hornet}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/globe.png")}
          style={styles.globe}
          resizeMode="contain"
        />
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  label: {
    fontSize: responsiveSize(30),
    marginVertical: responsiveSize(14),
    textAlign: "center",
    fontFamily: "Geo_400Regular",
  },
  inputBackground: {
    width: responsiveSize(260),
    height: responsiveSize(50),
    borderRadius: responsiveSize(10),
    overflow: "hidden",
    borderWidth: 2,
    zIndex: 5,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: responsiveSize(15),
    fontSize: responsiveSize(25),
    fontFamily: "Geo_400Regular",
    textAlign: "center",
    color: "#000",
    backgroundColor: "transparent",
  },
  selectorRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: responsiveSize(20),
  },
  selectorContainer: {
    alignItems: "center",
    width: responsiveSize(120),
    position: "relative",
  },
  colorButton: {
    width: responsiveSize(45),
    height: responsiveSize(45),
    borderRadius: responsiveSize(10),
    zIndex: 5,
  },
  colorOption: {
    width: responsiveSize(30),
    height: responsiveSize(30),
    borderRadius: responsiveSize(6),
    margin: responsiveSize(4),
  },
  iconButton: {
    width: responsiveSize(70),
    height: responsiveSize(45),
    borderRadius: responsiveSize(12),
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  iconOption: {
    width: responsiveSize(35),
    height: responsiveSize(35),
    margin: responsiveSize(4),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: responsiveSize(15),
    marginTop: responsiveSize(50),
  },
  camp: {
    width: responsiveSize(300),
    height: responsiveVertical(230),
    alignSelf: "center",
    position: "absolute",
    right: responsiveSize(-25),
    bottom: responsiveVertical(-240),
  },
  cloudImage: {
    width: responsiveSize(105),
    height: responsiveVertical(60),
    top: responsiveVertical(210),
    alignSelf: "center",
    position: "absolute",
  },
  airplane1: {
    width: responsiveSize(115),
    height: responsiveVertical(120),
    top: responsiveVertical(-10),
    right: responsiveSize(-60),
    alignSelf: "center",
    position: "absolute",
  },
  hornet: {
    width: responsiveSize(60),
    height: responsiveVertical(60),
    alignSelf: "center",
    position: "absolute",
    left: responsiveSize(-25),
  },
  globe: {
    width: responsiveSize(60),
    height: responsiveVertical(60),
    alignSelf: "center",
    position: "absolute",
    top: responsiveSize(-52),
    left: responsiveSize(5),
  },
  errorBox: {
    position: "absolute",
    bottom: responsiveSize(60), // 🔹 Ajusta si el label se superpone con los botones
    alignSelf: "center",
    backgroundColor: "#ab0000",
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(20),
    borderRadius: responsiveSize(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  errorText: {
    color: "#fff",
    fontFamily: "Geo_400Regular",
    fontSize: responsiveSize(20),
    textAlign: "center",
  },
});
