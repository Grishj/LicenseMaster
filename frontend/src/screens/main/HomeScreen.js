// HomeScreen.js
import React from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../assets/images";
import Card from "../../components/cards/Card";
import Header from "../../components/common/Header";

const HomeScreen = ({ navigation }) => {
  const isWeb = Platform.OS === "web";
  const columns = isWeb ? 1 : 2;

  const cards = [
    { title: "Syllabus", icon: images.syllabus, onPress: () => {} },
    { title: "Notes", icon: images.notes, onPress: () => {} },
    { title: "Past Questions", icon: images.pastquestions, onPress: () => {} },
    { title: "Events", icon: images.events, onPress: () => {} },
    {
      title: "Take Quiz",
      icon: images.quiz,
      onPress: () => navigation.navigate("QuizScreen"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Header
            username="John"
            showUsername={true}
            showNotification={true}
            showLogo={true}
            showBackButton={false}
            onNotificationPress={() => {}}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Body */}
          <View style={styles.grid}>
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                icon={card.icon}
                onPress={card.onPress}
                columns={columns}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light gray background
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Plain light gray background
  },
  headerContainer: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  grid: {
    paddingTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
