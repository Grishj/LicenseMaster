import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { Colors } from "../../utils/Colors";

const Header = ({
  username,
  title,
  showNotification = false,
  showBackButton = false,
  showUsername = false,
  showLogo = false, // Now only controls right-side logo
  onNotificationPress,
  onBackPress,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Dynamic theming
  const textColor = isDarkMode ? Colors.light : Colors.dark;
  const iconColor = isDarkMode ? Colors.light : Colors.dark;
  const logoIcon = isDarkMode ? "moon" : "sunny";
  const borderColor = isDarkMode ? Colors.darkBorder : Colors.lightBorder;

  return (
    <View
      style={[
        styles.container,
        isDarkMode && styles.darkContainer,
        { borderBottomColor: borderColor },
      ]}
    >
      {/* Left Section (Only Back Button) */}
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>

      {/* Center Section (Title/Username) */}
      <View style={styles.centerSection}>
        {title ? (
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        ) : showUsername && username ? (
          <Text style={[styles.greeting, { color: textColor }]}>
            Hello, {username}
          </Text>
        ) : null}
      </View>

      {/* Right Section (Logo + Notification) */}
      <View style={styles.rightSection}>
        <View style={styles.rightIconsContainer}>
          {showLogo && (
            <Ionicons
              name={logoIcon}
              size={24}
              color={Colors.dark}
              style={styles.logoIcon}
            />
          )}

          {showNotification && (
            <TouchableOpacity
              onPress={onNotificationPress}
              style={styles.iconButton}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={iconColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    width: "100%",
    // Add subtle shadow for better distinction
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  darkContainer: {
    backgroundColor: Colors.darkBackground,
  },
  leftSection: {
    flex: 1,
    alignItems: "flex-start",
    minWidth: 24, // Prevent layout shift when no back button
  },
  centerSection: {
    flex: 3,
    alignItems: "center",
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  rightIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    marginRight: 12, // Space between logo and notification
  },
  iconButton: {
    padding: 4,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;
