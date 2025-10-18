import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  Platform,
} from "react-native";
import { useEffect, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { responsiveSize } from "../../utils/responsive";

const screenHeight = Dimensions.get("window").height;

export function CustomModal({ modalName, isOpen, onClose, title, children }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Keyboard.dismiss();
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(translateY, {
          toValue: screenHeight,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isOpen]);

  // 🔹 Manejo del botón físico "atrás" en Android
  useEffect(() => {
    if (Platform.OS === "android" && isOpen) {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          onClose();
          return true; // evita que el sistema cierre la app
        }
      );
      return () => subscription.remove();
    }
  }, [isOpen]);

  const handleBackdropPress = () => {
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Animated.View
      style={[styles.backdrop, { opacity }]}
      pointerEvents={isOpen ? "auto" : "none"}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdropTouchableArea} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <ImageBackground
            source={require("../../assets/notebook.jpg")}
            style={styles.imageBackground}
            imageStyle={{ borderRadius: responsiveSize(16) }}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                Keyboard.dismiss();
                onClose();
              }}
            >
              <AntDesign
                name="closesquare"
                size={responsiveSize(30)}
                color="black"
              />
            </TouchableOpacity>

            {title && <Text style={styles.title}>{title}</Text>}

            <View style={styles.content}>{children}</View>
          </ImageBackground>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 1000,
  },
  backdropTouchableArea: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    width: "100%",
    height: screenHeight * 0.9,
    borderRadius: responsiveSize(16),
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "white",
    zIndex: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: responsiveSize(12),
    right: responsiveSize(12),
    zIndex: 20,
  },
  title: {
    marginTop: responsiveSize(50),
    fontSize: responsiveSize(55),
    textAlign: "center",
    fontFamily: "Geo_400Regular_Italic",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
