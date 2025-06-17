// src/components/cards/Card.js

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const Card = ({ title, icon, onPress, columns = 2 }) => {
  const cardWidth = columns === 1 ? "100%" : "45%";

  const getCardColors = (title) => {
    const colorSchemes = {
      Syllabus: { bg: "#6366f1", accent: "#4f46e5", shadow: "#6366f150" },
      Notes: { bg: "#ec4899", accent: "#db2777", shadow: "#ec489950" },
      "Past Questions": {
        bg: "#06b6d4",
        accent: "#0891b2",
        shadow: "#06b6d450",
      },
      Events: { bg: "#10b981", accent: "#059669", shadow: "#10b98150" },
      "Take Quiz": { bg: "#f59e0b", accent: "#d97706", shadow: "#f59e0b50" },
      "Computer Graphics": {
        bg: "#8b5cf6",
        accent: "#7c3aed",
        shadow: "#8b5cf650",
      },
      "Computer Networks": {
        bg: "#ef4444",
        accent: "#dc2626",
        shadow: "#ef444450",
      },
      "Data Structures": {
        bg: "#3b82f6",
        accent: "#2563eb",
        shadow: "#3b82f650",
      },
      Drawing: { bg: "#f97316", accent: "#ea580c", shadow: "#f9731650" },
      default: { bg: "#6366f1", accent: "#4f46e5", shadow: "#6366f150" },
    };
    return colorSchemes[title] || colorSchemes.default;
  };

  const colors = getCardColors(title);

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        {
          width: cardWidth,
          shadowColor: colors.shadow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.card, { backgroundColor: colors.bg }]}>
        {/* Modern glass overlay */}
        <View style={styles.glassOverlay}>
          {/* Accent stripe for modern look */}
          <View
            style={[styles.accentStripe, { backgroundColor: colors.accent }]}
          />

          {/* Icon container */}
          <View style={styles.iconContainer}>
            {icon && <Image source={icon} style={styles.icon} />}
            <View
              style={[
                styles.iconBackground,
                { backgroundColor: colors.accent },
              ]}
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Modern decorative elements */}
          <View
            style={[styles.decorativeDot1, { backgroundColor: colors.accent }]}
          />
          <View
            style={[styles.decorativeDot2, { backgroundColor: colors.accent }]}
          />

          {/* Subtle highlight */}
          <View style={styles.highlight} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    borderRadius: 20,
    minHeight: 110,
    position: "relative",
    overflow: "hidden",
  },
  glassOverlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    position: "relative",
  },
  accentStripe: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 4,
    height: "100%",
    opacity: 0.8,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 12,
    zIndex: 3,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    zIndex: 2,
  },
  iconBackground: {
    position: "absolute",
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 24,
    opacity: 0.2,
    zIndex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.2,
    lineHeight: 16,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    zIndex: 2,
  },
  decorativeDot1: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.4,
  },
  decorativeDot2: {
    position: "absolute",
    bottom: 12,
    left: 12,
    width: 4,
    height: 4,
    borderRadius: 2,
    opacity: 0.3,
  },
  highlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Card;
