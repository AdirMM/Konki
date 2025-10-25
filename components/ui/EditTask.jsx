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
} from "react-native";
import { useCategoryContext } from "../../context/CategoryContext";
import { useTaskContext } from "../../context/TaskContext";
import { useUIContext } from "../../context/UIContext";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import { CustomModal } from "./CustomModal";
import { CustomButton } from "./CustomButton";
import { CategoryList } from "./CategoryList";
import {
  responsiveSize,
  responsiveVertical,
  responsiveFont,
} from "../../utils/responsive";

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
          distance={responsiveSize(10)}
          startColor="rgba(0,0,0,1)"
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

        <Shadow
          distance={responsiveSize(7)}
          startColor="rgba(0,0,0,1)"
          finalColor="rgba(0,0,0,0)"
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

          <CustomButton
            icon={
              <Feather name="edit-2" size={responsiveSize(23)} color="white" />
            }
            onPress={handleSaveTask}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Imágenes decorativas */}
      <Image
        source={require("../../assets/cloud.png")}
        style={[styles.cloudImage, { left: responsiveSize(5) }]}
      />
      <Image
        source={require("../../assets/cloud.png")}
        style={[styles.cloudImage, { right: responsiveSize(5) }]}
      />
      <Image
        source={require("../../assets/globe.png")}
        style={styles.globe}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/spiderman.png")}
        style={styles.spiderman}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/airplane1.png")}
        style={styles.airplane}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/shark.png")}
        style={styles.shark}
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
    width: responsiveSize(335),
    borderRadius: responsiveSize(12),
    alignItems: "center",
    zIndex: 1000,
    gap: responsiveVertical(20),
  },
  charCount: {
    color: "#646464",
    marginBottom: responsiveVertical(5),
    fontFamily: "Geo_400Regular",
    fontSize: responsiveFont(17),
  },
  inputBackground: {
    width: responsiveSize(320),
    minHeight: responsiveVertical(180),
    borderWidth: responsiveSize(2.5),
    borderRadius: responsiveSize(10),
    overflow: "hidden",
  },
  textInput: {
    flex: 1,
    padding: responsiveSize(10),
    fontSize: responsiveFont(29),
    textAlignVertical: "top",
    backgroundColor: "transparent",
    color: "#000",
    fontFamily: "Geo_400Regular",
  },
  shadowContainer: {
    backgroundColor: "white",
    borderWidth: responsiveSize(2),
    borderColor: "#111",
    height: responsiveVertical(60),
    marginBottom: responsiveVertical(30),
    borderRadius: responsiveSize(10),
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: responsiveSize(25),
    justifyContent: "center",
  },
  globe: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    position: "absolute",
    top: responsiveVertical(-57),
    left: responsiveSize(25),
  },
  spiderman: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    position: "absolute",
    top: responsiveVertical(-38),
    right: responsiveSize(0),
  },
  airplane: {
    width: responsiveSize(100),
    height: responsiveSize(100),
    position: "absolute",
    bottom: responsiveVertical(130),
    left: responsiveSize(-10),
  },
  shark: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    position: "absolute",
    bottom: responsiveVertical(40),
    left: responsiveSize(60),
  },
  beach: {
    width: responsiveSize(180),
    height: responsiveSize(180),
    position: "absolute",
    bottom: responsiveVertical(40),
    right: responsiveSize(30),
  },
  cloudImage: {
    width: responsiveSize(110),
    height: responsiveVertical(70),
    alignSelf: "center",
    position: "absolute",
    top: responsiveVertical(210),
  },
});
