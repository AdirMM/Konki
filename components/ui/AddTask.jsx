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
  responsiveVertical,
  responsiveFont,
} from "../../utils/responsive";

export function AddTask() {
  const { addTask, taskInput, setTaskInput } = useTaskContext();
  const { modals, toggleModal, switchModal } = useUIContext();
  const { category, categories, maxCategories } = useCategoryContext();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [canAddCategory, setCanAddCategory] = useState(true);
  const maxLength = 100;

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

        <Shadow
          distance={responsiveSize(10)}
          startColor="rgba(0,0,0,1)"
          finalColor="rgba(0,0,0,0)"
          offset={[-responsiveSize(10), responsiveSize(8)]}
          radius={responsiveSize(10)}
          style={{ marginBottom: responsiveVertical(8) }}
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

        {canAddCategory && (
          <TouchableOpacity
            style={styles.touchWrapper}
            onPress={() => switchModal("addTask", "category")}
            activeOpacity={0.85}
          >
            <Shadow
              distance={responsiveSize(5)}
              startColor="#000"
              offset={[0, responsiveSize(2)]}
              style={styles.addCategoryButton}
            >
              <View style={styles.fullButtonArea}>
                <Text style={styles.addCategory}>Crear Categoría</Text>
              </View>
            </Shadow>
          </TouchableOpacity>
        )}

        <Shadow
          distance={responsiveSize(7)}
          startColor="rgba(0,0,0,1)"
          offset={[-responsiveSize(5), responsiveSize(8)]}
          radius={responsiveSize(10)}
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

      <Image
        source={require("../../assets/cloud.png")}
        style={[styles.cloudImage, { left: responsiveSize(-10) }]}
      />
      <Image
        source={require("../../assets/cloud.png")}
        style={[styles.cloudImage, { right: responsiveSize(-10) }]}
      />
      <Image
        source={require("../../assets/spiderman.png")}
        style={styles.spiderman}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/spider.png")}
        style={styles.spider}
        resizeMode="contain"
      />
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    width: responsiveSize(335),
    borderRadius: responsiveSize(12),
    alignItems: "center",
    zIndex: 1000,
    gap: responsiveVertical(20),
  },
  charCount: {
    color: "#646464",
    fontSize: responsiveFont(17),
    fontFamily: "Geo_400Regular",
  },
  inputBackground: {
    width: responsiveSize(320),
    minHeight: responsiveVertical(180),
    borderRadius: responsiveSize(10),
    borderWidth: responsiveSize(2.5),
    overflow: "hidden",
  },
  textInput: {
    flex: 1,
    padding: responsiveSize(10),
    fontFamily: "Geo_400Regular",
    fontSize: responsiveFont(20),
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
    paddingVertical: responsiveVertical(14),
    borderRadius: responsiveSize(20),
    width: responsiveSize(170),
  },
  addCategory: {
    color: "white",
    fontSize: responsiveFont(19),
    textAlign: "center",
    fontFamily: "Geo_400Regular",
  },
  shadowContainer: {
    height: responsiveVertical(60),
    marginBottom: responsiveVertical(30),
    backgroundColor: "white",
    borderWidth: responsiveSize(2),
    borderRadius: responsiveSize(10),
    borderColor: "#111",
  },
  cloudImage: {
    width: responsiveSize(110),
    height: responsiveVertical(70),
    alignSelf: "center",
    position: "absolute",
    bottom: responsiveVertical(210),
  },
  spiderman: {
    width: responsiveSize(120),
    height: responsiveVertical(120),
    alignSelf: "center",
    position: "absolute",
    bottom: responsiveVertical(90),
    left: responsiveSize(5),
  },
  spider: {
    width: responsiveSize(80),
    height: responsiveVertical(80),
    alignSelf: "center",
    position: "absolute",
    bottom: responsiveVertical(100),
    right: responsiveSize(20),
  },
});
