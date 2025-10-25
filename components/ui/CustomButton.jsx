import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Shadow } from "react-native-shadow-2";

const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const responsiveSize = (size) => (width / guidelineBaseWidth) * size;

export const CustomButton = React.memo(
  ({ icon, label, onPress, color = "#000", disabled = false }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        disabled={disabled}
        style={styles.touchWrapper}
      >
        <Shadow
          distance={5}
          startColor={color}
          offset={[0, 2]}
          style={[styles.button, label ? styles.textButton : styles.iconButton]}
        >
          <View>
            {icon ? icon : <Text style={styles.textLabel}>{label}</Text>}
          </View>
        </Shadow>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  touchWrapper: {
    alignSelf: "center",
    zIndex: 45,
  },
  button: {
    borderRadius: responsiveSize(20),
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    paddingHorizontal: responsiveSize(42),
    paddingVertical: responsiveSize(13),
  },
  textButton: {
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(14),
  },

  textLabel: {
    color: "white",
    fontSize: responsiveSize(19),
    fontFamily: "Geo_400Regular",
    textAlign: "center",
  },
});
