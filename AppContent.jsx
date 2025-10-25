import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AddTask } from "./components/ui/AddTask";
import { CategoryModal } from "./components/ui/CategoryModal";
import { CategoriesModal } from "./components/ui/CategoriesModal";
import { AddTaskButton } from "./components/AddTaskButton";
import { Menu } from "./components/ui/Menu";
import { BgDrawings } from "./components/BgDrawings";
import { FilterCategory } from "./components/ui/FilterCategory";
import { EditTask } from "./components/ui/EditTask";
import { MessageModal } from "./components/ui/MessageModal";
import { TaskList } from "./components/TaskList";
import {
  responsiveSize,
  responsiveVertical,
  responsiveFont,
} from "./utils/responsive";

export default function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const appOpacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(appOpacity, {
          toValue: 1,
          duration: 800,
          delay: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => setShowSplash(false));
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* App montada desde el inicio, invisible al principio */}
      <Animated.View style={{ flex: 1, opacity: appOpacity }}>
        <ImageBackground
          source={require("./assets/notebook.jpg")}
          style={styles.background}
          resizeMode="cover"
        >
          <BgDrawings />

          <View
            style={[
              styles.container,
              {
                paddingTop: insets.top + responsiveVertical(10),
                paddingBottom: insets.bottom + responsiveVertical(45),
              },
            ]}
          >
            {/* Encabezado */}
            <View
              style={[
                styles.topRow,
                {
                  gap: responsiveSize(40),
                  marginBottom: responsiveVertical(5),
                },
              ]}
            >
              <Menu />
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: responsiveSize(80),
                    paddingTop: responsiveVertical(10),
                  },
                ]}
              >
                Konki
              </Text>
              <FilterCategory />
            </View>

            <AddTask />
            <EditTask />
            <MessageModal />
            <CategoryModal />
            <CategoriesModal />
            <TaskList />

            <View
              style={[
                styles.taskControlsWrapper,
                { bottom: responsiveVertical(60) + insets.bottom },
              ]}
            >
              <AddTaskButton />
            </View>
          </View>
        </ImageBackground>
      </Animated.View>

      {/* Splash encima */}
      {showSplash && (
        <Animated.View
          style={[StyleSheet.absoluteFillObject, { opacity: splashOpacity }]}
        >
          <ImageBackground
            source={require("./assets/notebook.jpg")}
            style={styles.fullscreenBackground}
            resizeMode="cover"
          >
            <View style={styles.splashContent}>
              <Animated.Image
                source={require("./assets/konki-icon.png")}
                style={{
                  width: responsiveSize(230),
                  height: responsiveSize(230),
                  opacity: splashOpacity,
                  transform: [
                    {
                      scale: splashOpacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                }}
                resizeMode="contain"
              />
            </View>
          </ImageBackground>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  fullscreenBackground: { flex: 1, width: "100%", height: "100%" },
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  topRow: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "Geo_400Regular_Italic",
  },
  taskControlsWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  splashContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
