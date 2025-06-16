import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ username, onNotificationPress, onBackPress }) => {
  return (
    <View style={styles.container}>
      {onBackPress ? (
        <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}

      <Text style={styles.greeting}>Hello, {username}</Text>

      <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={24} color={Colors.dark} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  iconButton: {
    padding: 4,
  },
  iconPlaceholder: {
    width: 24, // space reserved if no back button
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark,
  },
});

export default Header;
