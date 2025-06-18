import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({
  username,
  title,
  showNotification = false,
  showBackButton = false,
  showUsername = false,
  showLogo = false,
  onNotificationPress,
  onBackPress,
}) => {
  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          ) : showLogo ? (
            <View style={styles.logoContainer}>
              <View style={styles.logoGlow} />
              <View style={styles.logoCircle}>
                <Ionicons name="school" size={28} color="#00d4ff" />
              </View>
            </View>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>

        {/* Center Section */}
        <View style={styles.centerSection}>
          {title ? (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.titleUnderline} />
            </View>
          ) : showUsername && username ? (
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>Welcome back,</Text>
              <Text style={styles.usernameText}>{username}! 👋</Text>
            </View>
          ) : null}
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          {showNotification && (
            <TouchableOpacity
              onPress={onNotificationPress}
              style={styles.notificationButton}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#ffffff"
              />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          )}
          {!showNotification && <View style={styles.placeholder} />}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 72,
  },
  leftSection: {
    width: 48,
    alignItems: "flex-start",
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  rightSection: {
    width: 48,
    alignItems: "flex-end",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  logoContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  logoGlow: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0, 212, 255, 0.15)",
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.3)",
  },
  placeholder: {
    width: 48,
    height: 48,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  titleUnderline: {
    width: 40,
    height: 3,
    backgroundColor: "#00d4ff",
    borderRadius: 2,
    marginTop: 6,
  },
  greetingContainer: {
    alignItems: "center",
  },
  greetingText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 2,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff006e",
    borderWidth: 2,
    borderColor: "rgba(26, 26, 46, 0.9)",
  },
});

export default Header;
