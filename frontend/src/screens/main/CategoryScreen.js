// CategoryScreen.js
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/cards/Card";
import { images } from "../../assets/images";
import Header from "../../components/common/Header";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const CategoryScreen = ({ navigation }) => {
  const tabBarHeight = useBottomTabBarHeight();

  const categories = [
    { title: "Computer Graphics", icon: images.cg },
    { title: "Computer Networks", icon: images.cn },
    { title: "Data Structures", icon: images.dsa },
    { title: "Drawing", icon: images.drawing },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header - moved outside ScrollView */}
      <View style={styles.headerContainer}>
        <Header
          title="Categories"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: tabBarHeight + 20 },
        ]}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {categories.map((item, index) => (
            <View key={index} style={styles.cardWrapper}>
              <Card
                title={item.title}
                icon={item.icon}
                onPress={() =>
                  navigation.navigate("QuizScreen", { category: item.title })
                }
                columns={1}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc", // Consistent with ExamScreen
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8, // Reduced top padding since header is separate
  },
  headerContainer: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardsContainer: {
    flexDirection: "column",
    gap: 16, // Better than marginBottom on each item
  },
  cardWrapper: {
    // marginBottom: 16, // Consistent bottom margin
  },
});
