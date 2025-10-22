import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useCategoryContext } from "../../context/CategoryContext";
import { useTaskContext } from "../../context/TaskContext";
import { useUIContext } from "../../context/UIContext";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import { CustomModal } from "./CustomModal";
import { CustomButton } from "./CustomButton";
import { CategoryList } from "./CategoryList";

const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const responsiveSize = (size) => (width / guidelineBaseWidth) * size;

export function EditTask() {
  const { selectedTask, editTask, removeTask } = useTaskContext();
  const { modals, toggleModal } = useUIContext();
  const { category } = useCategoryContext();

  const [editedTask, setEditedTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const maxLength = 100;

  useEffect(() => {
    if (modals?.editTask?.isOpen && selectedTask) {
      setEditedTask(selectedTask.text || "");
      setSelectedCategory(selectedTask.category || category);
    }
  }, [modals?.editTask?.isOpen, selectedTask]);

  const handleClose = () => {
    toggleModal("editTask");
    setEditedTask("");
    setSelectedCategory(null);
  };

  const handleSaveTask = () => {
    if (!editedTask.trim()) return;
    editTask(selectedTask.id, {
      text: editedTask,
      category: selectedCategory,
    });
    handleClose();
  };

  const handleRemoveTask = () => {
    removeTask(selectedTask.id);
    handleClose();
  };

  return (
    <CustomModal
      modalName="editTask"
      isOpen={modals?.editTask?.isOpen || false}
      onClose={handleClose}
      title="Editar Tarea"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalView}
      >
        <Text style={styles.charCount}>
          {(editedTask || "").length}/{maxLength} caracteres
        </Text>

        <Shadow
          distance={10}
          startColor="rgba(0,0,0,1)"
          offset={[-10, 8]}
          radius={responsiveSize(10)}
          style={{ marginBottom: responsiveSize(8) }}
        >
          <ImageBackground
            source={require("../../assets/notebook.jpg")}
            style={styles.inputBackground}
            imageStyle={{ borderRadius: responsiveSize(10) }}
          >
            <TextInput
              value={editedTask || ""}
              maxLength={maxLength}
              onChangeText={setEditedTask}
              onSubmitEditing={handleSaveTask}
              multiline
              placeholder="Edita tu tarea"
              style={styles.textInput}
              returnKeyType="done"
              placeholderTextColor="#666"
            />
          </ImageBackground>
        </Shadow>

        <Text style={styles.categoryText}>Categoría</Text>

        <Shadow
          distance={7}
          startColor="rgba(0,0,0,1)"
          finalColor="rgba(0,0,0,0)"
          offset={[-5, 8]}
          radius={responsiveSize(10)}
        >
          <View style={styles.shadowContainer}>
            <CategoryList
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </View>
        </Shadow>

        <View style={styles.buttonsContainer}>
          <CustomButton
            icon={
              <AntDesign
                name="delete"
                size={responsiveSize(23)}
                color="white"
              />
            }
            color="#ab0000"
            onPress={handleRemoveTask}
          />

          {/* Botón Editar */}
          <CustomButton
            icon={
              <Feather name="edit-2" size={responsiveSize(23)} color="white" />
            }
            onPress={handleSaveTask}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Imagenes decorativas */}
      <Image
        source={require("../../assets/cloud.png")}
        style={[styles.cloudImage, { left: responsiveSize(-10) }]}
      />
      <Image
        source={require("../../assets/cloud.png")}
        style={[styles.cloudImage, { right: responsiveSize(-10) }]}
      />
      <Image
        source={require("../../assets/airplane1.png")}
        style={styles.airplane}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/beach.png")}
        style={styles.beach}
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
  },
  charCount: {
    color: "#646464",
    marginBottom: responsiveSize(5),
    fontFamily: "Geo_400Regular",
    fontSize: responsiveSize(17),
  },
  inputBackground: {
    width: width * 0.85,
    minHeight: height * 0.22,
    borderWidth: responsiveSize(2.5),
    borderRadius: responsiveSize(10),
    overflow: "hidden",
  },
  textInput: {
    flex: 1,
    padding: responsiveSize(10),
    fontSize: responsiveSize(29),
    letterSpacing: 1.2,
    textAlignVertical: "top",
    backgroundColor: "transparent",
    color: "#000",
    fontFamily: "Geo_400Regular",
  },
  shadowContainer: {
    backgroundColor: "white",
    borderWidth: responsiveSize(2),
    borderColor: "#111",
    height: responsiveSize(60),
    marginBottom: responsiveSize(40),
    borderRadius: responsiveSize(10),
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: responsiveSize(25),
    justifyContent: "center",
  },
  categoryText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Geo_400Regular",
    fontSize: responsiveSize(24),
    marginTop: responsiveSize(20),
    marginBottom: responsiveSize(10),
  },
  saveButton: {
    alignSelf: "center",
    backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: responsiveSize(40),
    paddingVertical: responsiveSize(11),
    borderRadius: responsiveSize(20),
  },
  deleteButton: {
    alignSelf: "center",
    backgroundColor: "#ab0000",
    alignItems: "center",
    paddingHorizontal: responsiveSize(40),
    paddingVertical: responsiveSize(11),
    borderRadius: responsiveSize(20),
  },
  airplane: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    position: "absolute",
    bottom: responsiveSize(110),
    left: responsiveSize(60),
  },
  beach: {
    width: responsiveSize(120),
    height: responsiveSize(120),
    position: "absolute",
    bottom: responsiveSize(80),
    right: responsiveSize(30),
  },
  cloudImage: {
    width: responsiveSize(110),
    height: responsiveSize(70),
    alignSelf: "center",
    position: "absolute",
    top: responsiveSize(210),
  },
});
