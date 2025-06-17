// MoreScreen.js

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "../../components/cards/Card";
import { images } from "../../assets/images";
import Header from "../../components/common/Header";
const MoreScreen = ({ navigation }) => {
  const categories = [
    { title: "Specific Category", icon: images.cg },
    { title: "Random Categories", icon: images.cn },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Header
          title="More Screen"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
        />
      </View>
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
    </SafeAreaView>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Match your app's background color
  },
  container: {
    padding: 16,
  },
  column: {
    flexDirection: "column",
    paddingTop: 30,
  },
});
