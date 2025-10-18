import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useCategoryContext } from "../../context/CategoryContext";
import { useTaskContext } from "../../context/TaskContext";
import { useUIContext } from "../../context/UIContext";
import { Entypo } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import { CustomModal } from "./CustomModal";
import { CustomButton } from "./CustomButton";
import { CategoryList } from "./CategoryList";

// ✅ Importa helpers responsivos
import {
  responsiveSize,
  responsiveWidth,
  responsiveHeight,
} from "../../utils/responsive";

export function AddTask() {
  const { addTask, taskInput, setTaskInput } = useTaskContext();
  const { modals, toggleModal, switchModal } = useUIContext();
  const { category, categories, maxCategories } = useCategoryContext();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [canAddCategory, setCanAddCategory] = useState(true);
  const maxLength = 100;

  // ⚡ Reinicia valores cada vez que se abre el modal
  useEffect(() => {
    if (modals?.addTask?.isOpen) {
      setTaskInput("");

      const defaultCategory =
        categories?.find((cat) => cat.name === "Todas") || category;
      setSelectedCategory(defaultCategory);

      setCanAddCategory(categories.length < maxCategories);
    }
  }, [modals?.addTask?.isOpen, categories]);

  const handleAddTask = () => {
    if (taskInput.trim() === "") return;
    addTask(taskInput, selectedCategory);
    handleClose();
  };

  const handleClose = () => {
    toggleModal("addTask");
    setTaskInput("");
    setSelectedCategory(null);
  };

  return (
    <CustomModal
      modalName="addTask"
      isOpen={modals?.addTask?.isOpen || false}
      onClose={handleClose}
      title="Agregar Tarea"
    >
      <View style={styles.modalView}>
        <Text style={styles.charCount}>
          {taskInput.length}/{maxLength} caracteres
        </Text>

        {/* Input de tarea */}
        <Shadow
          distance={10}
          startColor="rgba(0,0,0,1)"
          finalColor="rgba(0,0,0,0)"
          offset={[-10, 8]}
          radius={10}
          style={{ marginBottom: responsiveSize(8) }}
        >
          <ImageBackground
            source={require("../../assets/notebook.jpg")}
            style={styles.inputBackground}
            imageStyle={{ borderRadius: responsiveSize(10) }}
          >
            <TextInput
              value={taskInput}
              maxLength={maxLength}
              onChangeText={setTaskInput}
              onSubmitEditing={handleAddTask}
              multiline
              placeholder="Añade una tarea"
              style={styles.textInput}
              returnKeyType="done"
              placeholderTextColor="#666"
            />
          </ImageBackground>
        </Shadow>

        {/* Botón Crear Categoría */}
        {canAddCategory && (
          <TouchableOpacity
            style={styles.touchWrapper}
            onPress={() => switchModal("addTask", "category")}
            activeOpacity={0.85}
          >
            <Shadow
              distance={5}
              startColor="#000"
              offset={[0, 2]}
              style={styles.addCategoryButton}
            >
              <View style={styles.fullButtonArea}>
                <Text style={styles.addCategory}>Crear Categoría</Text>
              </View>
            </Shadow>
          </TouchableOpacity>
        )}

        {/* Lista de categorías */}
        <Shadow
          distance={7}
          startColor="rgba(0,0,0,1)"
          offset={[-5, 8]}
          radius={10}
        >
          <View style={styles.shadowContainer}>
            <CategoryList
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </View>
        </Shadow>

        <CustomButton
          icon={<Entypo name="plus" size={responsiveSize(30)} color="white" />}
          onPress={handleAddTask}
        />
      </View>

      {/* Imágenes decorativas */}
      <Image
        source={require("../../assets/cloud.png")}
        style={[styles.cloudImage, { left: responsiveSize(-10) }]}
      />
      <Image
        source={require("../../assets/cloud.png")}
        style={[styles.cloudImage, { right: responsiveSize(-10) }]}
      />
      <Image
        source={require("../../assets/tree.png")}
        style={styles.treeImage}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/gatito1.png")}
        style={styles.catImage}
        resizeMode="contain"
      />
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    width: "90%",
    borderRadius: responsiveSize(12),
    alignItems: "center",
    zIndex: 1000,
    gap: responsiveSize(20),
  },
  charCount: {
    color: "#646464",
    fontSize: responsiveSize(17),
    fontFamily: "Geo_400Regular",
  },
  inputBackground: {
    width: responsiveWidth(320), // reemplazo de width * 0.85
    minHeight: responsiveHeight(180), // reemplazo de height * 0.22
    borderRadius: responsiveSize(10),
    borderWidth: responsiveSize(2.5),
    overflow: "hidden",
  },
  textInput: {
    flex: 1,
    padding: responsiveSize(10),
    fontFamily: "Geo_400Regular",
    fontSize: responsiveSize(29),
    letterSpacing: 1.2,
    textAlignVertical: "top",
    backgroundColor: "transparent",
    color: "#000",
  },
  touchWrapper: {
    width: "100%",
    alignItems: "center",
  },
  fullButtonArea: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  addCategoryButton: {
    paddingVertical: responsiveSize(14),
    borderRadius: responsiveSize(20),
    width: responsiveWidth(170), // reemplazo de width * 0.45
  },
  addCategory: {
    color: "white",
    fontSize: responsiveSize(19),
    textAlign: "center",
    fontFamily: "Geo_400Regular",
  },
  shadowContainer: {
    height: responsiveSize(60),
    marginBottom: responsiveSize(30),
    backgroundColor: "white",
    borderWidth: responsiveSize(2),
    borderRadius: responsiveSize(10),
    borderColor: "#111",
  },
  cloudImage: {
    width: responsiveSize(110),
    height: responsiveSize(70),
    alignSelf: "center",
    position: "absolute",
    bottom: responsiveSize(210),
  },
  treeImage: {
    width: responsiveSize(120),
    height: responsiveSize(120),
    alignSelf: "center",
    position: "absolute",
    bottom: responsiveSize(90),
    right: responsiveSize(-10),
  },
  catImage: {
    width: responsiveSize(70),
    height: responsiveSize(70),
    alignSelf: "center",
    position: "absolute",
    bottom: responsiveSize(110),
    left: responsiveSize(30),
  },
});
