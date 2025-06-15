import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";

const LeaderboardCard = ({ rank, name, score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rank}>#{rank}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.score}>{score} pts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    marginVertical: 4,
    borderRadius: 8,
  },
  rank: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.primary,
  },
  name: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  score: {
    fontSize: 16,
    color: Colors.success,
  },
});

export default LeaderboardCard;
