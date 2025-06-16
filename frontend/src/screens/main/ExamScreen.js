// ExamScreen.js

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Card from "../../components/cards/Card";
import { images } from "../../assets/images";

const ExamScreen = ({ navigation }) => {
  const categories = [
    { title: "Specific Category", icon: images.cg },
    { title: "Random Categories", icon: images.cn },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.column}>
        {categories.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            icon={item.icon}
            onPress={() =>
              navigation.navigate("QuizScreen", { category: item.title })
            }
            columns={1}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ExamScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  column: {
    flexDirection: "column",
  },
});
