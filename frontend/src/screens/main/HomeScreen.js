import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { images } from "../../assets/images"; // update this path if needed
import Card from "../../components/cards/Card";
const HomeScreen = ({ navigation }) => {
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            icon={card.icon}
            onPress={card.onPress}
            columns={2}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
