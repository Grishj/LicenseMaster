import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const leaderboardData = [
  { name: "Ravi", score: 18 },
  { name: "Sita", score: 17 },
  { name: "Bikash", score: 15 },
  { name: "Anju", score: 14 },
  { name: "You", score: 13 },
];

const LeaderboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f1f1f1",
    marginBottom: 8,
    borderRadius: 8,
  },
  rank: { fontWeight: "bold", width: 40 },
  name: { flex: 1 },
  score: { fontWeight: "bold" },
});

export default LeaderboardScreen;
