import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { images } from "../../assets/images";

const SyllabusCard = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={images.syllabus} style={styles.icon} />
      <Text style={styles.text}>Syllabus</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    margin: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default SyllabusCard;
