import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";

const CustomButton = ({ label, onPress, variant = "primary" }) => {
  return (
    <TouchableOpacity
      style={[styles.button, variant === "secondary" && styles.secondary]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  label: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default CustomButton;
