// src/components/cards/Card.js

import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Card = ({ title, icon, onPress, columns = 2 }) => {
  const cardWidth = columns === 1 ? "100%" : "45%"; // dynamic layout

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={onPress}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={styles.text}>{title}</Text>
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
    resizeMode: "contain",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Card;
