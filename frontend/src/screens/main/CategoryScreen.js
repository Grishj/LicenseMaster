// CategoryScreen.js

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Card from "../../components/cards/Card";
import { images } from "../../assets/images";

const CategoryScreen = ({ navigation }) => {
  const categories = [
    { title: "Computer Graphics", icon: images.cg },
    { title: "Computer Networks", icon: images.cn },
    { title: "Data Structures", icon: images.dsa },
    { title: "Drawing", icon: images.drawing },
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

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  column: {
    flexDirection: "column",
  },
});
