import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ResultScreen = ({ route, navigation }) => {
  const { score, total } = route.params;
  const correct = score >= 0 ? Math.floor(score) : 0;
  const wrong = total - correct;
  const percentage = Math.round((correct / total) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Quiz Results</Text>

        {/* Score Circle */}
        <View style={styles.scoreCircle}>
          <Text style={styles.scorePercentage}>{percentage}%</Text>
          <Text style={styles.scoreText}>Score</Text>
        </View>

        {/* Stats Container */}
        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Questions:</Text>
            <Text style={styles.statValue}>{total}</Text>
          </View>
          <View style={[styles.statRow, styles.correctRow]}>
            <Text style={styles.statLabel}>Correct:</Text>
            <Text style={styles.statValue}>{correct}</Text>
          </View>
          <View style={[styles.statRow, styles.wrongRow]}>
            <Text style={styles.statLabel}>Wrong:</Text>
            <Text style={styles.statValue}>{wrong}</Text>
          </View>
        </View>

        {/* Icon Navigation */}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("LeaderboardScreen")}
          >
            <MaterialIcons name="leaderboard" size={32} color="#3498db" />
            <Text style={styles.iconLabel}>Leaderboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.replace("QuizScreen")} // Assuming your quiz screen route name
          >
            <MaterialIcons name="replay" size={32} color="#f39c12" />
            <Text style={styles.iconLabel}>Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.replace("MainApp")}
          >
            <MaterialIcons name="home" size={32} color="#2c3e50" />
            <Text style={styles.iconLabel}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 32,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  scorePercentage: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  scoreText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },
  statsContainer: {
    width: "100%",
    marginBottom: 32,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  correctRow: {
    borderLeftWidth: 4,
    borderLeftColor: "#2ecc71",
  },
  wrongRow: {
    borderLeftWidth: 4,
    borderLeftColor: "#e74c3c",
  },
  statLabel: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 24,
  },
  iconButton: {
    alignItems: "center",
    padding: 12,
    minWidth: 80,
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },
});

export default ResultScreen;
