import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ResultScreen = ({ route, navigation }) => {
  const { score, total } = route.params;
  const correct = score >= 0 ? Math.floor(score) : 0;
  const wrong = total - correct;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Score: {score}</Text>
      <Text>Questions Attempted: {total}</Text>
      <Text>Correct Answers: {correct}</Text>
      <Text>Wrong Answers: {wrong}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LeaderboardScreen")}
      >
        <Text style={styles.buttonText}>View Leaderboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "gray" }]}
        onPress={() => navigation.replace("MainApp")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  button: {
    marginTop: 20,
    backgroundColor: "#0077cc",
    padding: 12,
    borderRadius: 10,
    width: "80%",
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});

export default ResultScreen;
