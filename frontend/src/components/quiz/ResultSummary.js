import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";

const ResultSummary = ({ score, correct, wrong, total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Result</Text>
      <Text style={styles.item}>Score: {score}</Text>
      <Text style={styles.item}>Correct: {correct}</Text>
      <Text style={styles.item}>Wrong: {wrong}</Text>
      <Text style={styles.item}>Total Attempted: {total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  item: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default ResultSummary;
