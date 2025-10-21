import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { responsiveSize, responsiveVertical } from "../utils/responsive";

const images = {
  addtask2: require("../assets/addtask2.png"),
  "no-tasks": require("../assets/notasks.png"),
  nothing: require("../assets/nothing.png"),
};

export function EmptyState({ src = "no-tasks" }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(responsiveVertical(50))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const source = images[src] || images["no-tasks"];

  return (
    <Animated.Image
      source={source}
      style={[
        styles.image,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    position: "relative",
    bottom: responsiveVertical(10),
    width: responsiveSize(340),
    height: responsiveVertical(500),
    alignSelf: "center",
  },
});
