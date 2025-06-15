import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ username, onNotificationPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {username}</Text>
      <TouchableOpacity onPress={onNotificationPress}>
        <Ionicons name="notifications-outline" size={24} color={Colors.dark} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark,
  },
});

export default Header;
