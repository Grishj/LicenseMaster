import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Card = ({ title, icon, onPress, columns = 2, index = 0 }) => {
  const cardWidth = columns === 1 ? "100%" : "47%";

  // Animation values
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getCardGradient = (title) => {
    const gradients = {
      Syllabus: ["#00d4ff", "#0077cc", "#005299"],
      Notes: ["#ff006e", "#c10055", "#8b0041"],
      "Past Questions": ["#06ffa5", "#00cc84", "#009963"],
      Events: ["#ffb700", "#ff8c00", "#ff6200"],
      "Take Quiz": ["#a855f7", "#7c3aed", "#6d28d9"],
      default: ["#00d4ff", "#0077cc", "#005299"],
    };
    return gradients[title] || gradients.default;
  };

  const getIconName = (title) => {
    const icons = {
      Syllabus: "book-outline",
      Notes: "document-text-outline",
      "Past Questions": "time-outline",
      Events: "calendar-outline",
      "Take Quiz": "trophy-outline",
    };
    return icons[title] || "grid-outline";
  };

  const gradientColors = getCardGradient(title);

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          width: cardWidth,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          {/* Background decoration */}
          <View style={styles.cardDecoration}>
            <View style={styles.circle1} />
            <View style={styles.circle2} />
          </View>

          {/* Glass overlay effect */}
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]}
            style={styles.glassOverlay}
          >
            {/* Icon container with glow */}
            <View style={styles.iconContainer}>
              <View style={styles.iconGlow} />
              <View style={styles.iconCircle}>
                <Ionicons name={getIconName(title)} size={32} color="#ffffff" />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>{title}</Text>

            {/* Arrow indicator */}
            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>→</Text>
            </View>
          </LinearGradient>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    height: 140,
  },
  touchable: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  card: {
    flex: 1,
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
  cardDecoration: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  circle1: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: -20,
    right: -20,
  },
  circle2: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    bottom: -15,
    left: -15,
  },
  glassOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  iconGlow: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  arrowContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Card;
