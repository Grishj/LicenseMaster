// ExamScreen.js
import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/cards/Card";
import { images } from "../../assets/images";
import Header from "../../components/common/Header";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const ExamScreen = ({ navigation }) => {
  const tabBarHeight = useBottomTabBarHeight();

  const categories = [
    {
      title: "Specific Category",
      icon: images.cg,
      description: "Choose from specific subjects",
    },
    {
      title: "Random Categories",
      icon: images.cn,
      description: "Mixed questions from all topics",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header with enhanced styling */}
      <View style={styles.headerContainer}>
        <Header
          title="Exam"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
        />
      </View>

      {/* Modern geometric background elements */}
      <View style={styles.geometricShape1} />
      <View style={styles.geometricShape2} />
      <View style={styles.geometricShape3} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: tabBarHeight + 40 },
        ]}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Choose Your Exam Mode</Text>
          <Text style={styles.welcomeSubtitle}>
            Select how you'd like to take your exam today
          </Text>
        </View>

        {/* Cards Section */}
        <View style={styles.cardsSection}>
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
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          ))}
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Subjects Available</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>240+</Text>
            <Text style={styles.statLabel}>Total Questions</Text>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>📝 Exam Tips</Text>
          <Text style={styles.tipsText}>
            • Read each question carefully before answering{"\n"}• Use the
            process of elimination for multiple choice{"\n"}• Don't spend too
            much time on one question
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExamScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0, // Since header is separate
  },
  // Modern geometric background elements
  geometricShape1: {
    position: "absolute",
    top: 100,
    right: -30,
    width: 80,
    height: 80,
    backgroundColor: "#e0e7ff",
    borderRadius: 20,
    transform: [{ rotate: "15deg" }],
    opacity: 0.6,
    zIndex: -1,
  },
  geometricShape2: {
    position: "absolute",
    top: 300,
    left: -20,
    width: 60,
    height: 60,
    backgroundColor: "#fef3c7",
    borderRadius: 30,
    opacity: 0.7,
    zIndex: -1,
  },
  geometricShape3: {
    position: "absolute",
    bottom: 150,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: "#dcfce7",
    borderRadius: 8,
    transform: [{ rotate: "45deg" }],
    opacity: 0.8,
    zIndex: -1,
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
  welcomeSection: {
    marginBottom: 32,
    paddingTop: 24,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
  cardsSection: {
    marginBottom: 32,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    width: "47%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#3b82f6",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    fontWeight: "500",
  },
  tipsSection: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
});
