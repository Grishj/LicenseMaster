import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const leaderboardData = [
  { name: "Ravi", score: 18 },
  { name: "Sita", score: 17 },
  { name: "Bikash", score: 15 },
  { name: "Anju", score: 14 },
  { name: "You", score: 13 },
];

const LeaderboardScreen = ({ navigation }) => {
  const renderItem = ({ item, index }) => {
    const isYou = item.name === "You";
    const trophyColor =
      index === 0
        ? "#FFD700"
        : index === 1
        ? "#C0C0C0"
        : index === 2
        ? "#CD7F32"
        : null;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.row,
          isYou && styles.youRow,
          { opacity: pressed ? 0.9 : 1 },
        ]}
      >
        <View
          style={[
            styles.rankBadge,
            trophyColor && { backgroundColor: trophyColor },
          ]}
        >
          {index < 3 ? (
            <MaterialIcons name="emoji-events" size={24} color="#fff" />
          ) : (
            <Text style={styles.rank}>#{index + 1}</Text>
          )}
        </View>
        <Text style={[styles.name, isYou && styles.youText]}>{item.name}</Text>
        <Text style={[styles.score, isYou && styles.youText]}>
          {item.score}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with navigation icons */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Leaderboard</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("MainApp")}
            style={styles.iconButton}
          >
            <MaterialIcons name="home" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Leaderboard list */}
      <FlatList
        data={leaderboardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#0077cc",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#005599",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
    textAlign: "center",
    flex: 1,
    marginHorizontal: 12,
  },
  iconButton: {
    padding: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  youRow: {
    backgroundColor: "#e6f0ff",
    borderWidth: 1,
    borderColor: "#0077cc",
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#B0B0B0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rank: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  score: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  youText: {
    color: "#0077cc",
    fontWeight: "700",
  },
});

export default LeaderboardScreen;
