import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../components/cards/Card";
import Header from "../../components/common/Header";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const { height } = Dimensions.get("window");

const ExamScreen = ({ navigation }) => {
  const tabBarHeight = useBottomTabBarHeight();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const categories = [
    {
      title: "Specific Category",
      description: "Choose from specific subjects",
      icon: "folder-outline",
      gradient: ["#00d4ff", "#0077cc", "#005299"],
    },
    {
      title: "Random Categories",
      description: "Mixed questions from all topics",
      icon: "shuffle-outline",
      gradient: ["#ff006e", "#c10055", "#8b0041"],
    },
  ];

  return (
    <LinearGradient
      colors={["#1a1a2e", "#16213e", "#0f3460"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Background decoration */}
        <View style={styles.backgroundDecoration}>
          <View style={styles.circle1} />
          <View style={styles.circle2} />
          <View style={styles.circle3} />
          <View style={styles.circle4} />
        </View>

        {/* Header */}
        <Header
          title="Exam Mode"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
        />

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: tabBarHeight + 40 },
          ]}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <View style={styles.iconContainer}>
                <View style={styles.iconGlow} />
                <View style={styles.iconCircle}>
                  <Ionicons name="school-outline" size={40} color="#00d4ff" />
                </View>
              </View>
              <Text style={styles.welcomeTitle}>Choose Your Exam Mode</Text>
              <Text style={styles.welcomeSubtitle}>
                Select how you'd like to take your exam today
              </Text>
            </View>

            {/* Cards Section */}
            <View style={styles.cardsSection}>
              {categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.examCard}
                  onPress={() =>
                    navigation.navigate("QuizScreen", { category: item.title })
                  }
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={item.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.examCardGradient}
                  >
                    <View style={styles.examCardContent}>
                      <View style={styles.examIconContainer}>
                        <Ionicons name={item.icon} size={32} color="#ffffff" />
                      </View>
                      <View style={styles.examTextContainer}>
                        <Text style={styles.examCardTitle}>{item.title}</Text>
                        <Text style={styles.examCardDescription}>
                          {item.description}
                        </Text>
                      </View>
                      <View style={styles.arrowContainer}>
                        <Text style={styles.arrow}>→</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            {/* Stats Section */}
            <View style={styles.statsSection}>
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.1)",
                  "rgba(255, 255, 255, 0.05)",
                ]}
                style={styles.statsGradient}
              >
                <View style={styles.statCard}>
                  <View style={styles.statIconContainer}>
                    <Ionicons name="book" size={24} color="#00d4ff" />
                  </View>
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Subjects Available</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statCard}>
                  <View style={styles.statIconContainer}>
                    <Ionicons name="help-circle" size={24} color="#ff006e" />
                  </View>
                  <Text style={styles.statNumber}>240+</Text>
                  <Text style={styles.statLabel}>Total Questions</Text>
                </View>
              </LinearGradient>
            </View>

            {/* Tips Section */}
            <View style={styles.tipsSection}>
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.1)",
                  "rgba(255, 255, 255, 0.05)",
                ]}
                style={styles.tipsGradient}
              >
                <View style={styles.tipsHeader}>
                  <View style={styles.tipsIconContainer}>
                    <Ionicons name="bulb-outline" size={24} color="#ffb700" />
                  </View>
                  <Text style={styles.tipsTitle}>Exam Tips</Text>
                </View>
                <View style={styles.tipsList}>
                  <View style={styles.tipItem}>
                    <Text style={styles.tipBullet}>•</Text>
                    <Text style={styles.tipText}>
                      Read each question carefully before answering
                    </Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Text style={styles.tipBullet}>•</Text>
                    <Text style={styles.tipText}>
                      Use the process of elimination for multiple choice
                    </Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Text style={styles.tipBullet}>•</Text>
                    <Text style={styles.tipText}>
                      Don't spend too much time on one question
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  backgroundDecoration: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  circle1: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(0, 212, 255, 0.08)",
    top: 50,
    right: -90,
  },
  circle2: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 0, 110, 0.08)",
    top: 200,
    left: -60,
  },
  circle3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 183, 0, 0.08)",
    bottom: 200,
    right: -50,
  },
  circle4: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(168, 85, 247, 0.08)",
    bottom: 50,
    left: -75,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 8,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    marginBottom: 32,
    paddingTop: 24,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconGlow: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(0, 212, 255, 0.15)",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(0, 212, 255, 0.3)",
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 40,
  },
  cardsSection: {
    marginBottom: 32,
    gap: 16,
  },
  examCard: {
    borderRadius: 20,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  examCardGradient: {
    borderRadius: 20,
  },
  examCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  examIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  examTextContainer: {
    flex: 1,
  },
  examCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  examCardDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statsSection: {
    marginBottom: 32,
    borderRadius: 20,
    overflow: "hidden",
  },
  statsGradient: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
  },
  statCard: {
    alignItems: "center",
    flex: 1,
  },
  statIconContainer: {
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  tipsSection: {
    borderRadius: 20,
    overflow: "hidden",
  },
  tipsGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  tipsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 183, 0, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tipBullet: {
    fontSize: 16,
    color: "#00d4ff",
    marginRight: 8,
    fontWeight: "bold",
  },
  tipText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 20,
    flex: 1,
  },
});

export default ExamScreen;
