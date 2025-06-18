import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/common/Header";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const { width, height } = Dimensions.get("window");

const CategoryScreen = ({ navigation }) => {
  const tabBarHeight = useBottomTabBarHeight();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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
    ]).start();
  }, []);

  const categories = [
    {
      title: "Computer Graphics",
      icon: "color-palette-outline",
      gradient: ["#667eea", "#764ba2", "#6B46C1"],
      description: "3D modeling, rendering & visualization",
    },
    {
      title: "Computer Networks",
      icon: "git-network-outline",
      gradient: ["#f093fb", "#f5576c", "#ED4264"],
      description: "TCP/IP, protocols & network security",
    },
    {
      title: "Data Structures",
      icon: "git-branch-outline",
      gradient: ["#4facfe", "#00f2fe", "#00C9FF"],
      description: "Arrays, trees, graphs & algorithms",
    },
    {
      title: "Drawing",
      icon: "brush-outline",
      gradient: ["#fa709a", "#fee140", "#FA8072"],
      description: "Technical drawing & design principles",
    },
  ];

  const CategoryCard = ({ item, index }) => {
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const cardFadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(cardFadeAnim, {
          toValue: 1,
          duration: 600,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: cardFadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("QuizScreen", { category: item.title })
          }
          activeOpacity={0.9}
          style={styles.touchable}
        >
          <LinearGradient
            colors={item.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            {/* Background decoration */}
            <View style={styles.cardDecoration}>
              <View style={styles.cardCircle1} />
              <View style={styles.cardCircle2} />
            </View>

            {/* Glass overlay */}
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.15)",
                "rgba(255, 255, 255, 0.05)",
              ]}
              style={styles.glassOverlay}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <View style={styles.iconGlow} />
                  <View style={styles.iconCircle}>
                    <Ionicons name={item.icon} size={32} color="#ffffff" />
                  </View>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Text style={styles.arrow}>→</Text>
                </View>
              </View>
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

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
        </View>

        {/* Header */}
        <Header
          title="Categories"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
        />

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: tabBarHeight + 20 },
          ]}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Section Header */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Choose Your Subject</Text>
              <Text style={styles.sectionSubtitle}>
                Select a category to start your quiz journey
              </Text>
            </View>

            {/* Categories */}
            <View style={styles.cardsContainer}>
              {categories.map((item, index) => (
                <CategoryCard key={index} item={item} index={index} />
              ))}
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.1)",
                  "rgba(255, 255, 255, 0.05)",
                ]}
                style={styles.statsGradient}
              >
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>4</Text>
                  <Text style={styles.statLabel}>Categories</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>120+</Text>
                  <Text style={styles.statLabel}>Questions</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>∞</Text>
                  <Text style={styles.statLabel}>Practice</Text>
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
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(0, 212, 255, 0.08)",
    top: 100,
    left: -100,
  },
  circle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(0, 119, 204, 0.08)",
    bottom: 200,
    right: -75,
  },
  circle3: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0, 82, 153, 0.08)",
    top: height / 2,
    left: -60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: 22,
  },
  cardsContainer: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 32,
  },
  cardContainer: {
    height: 120,
    width: "100%",
  },
  touchable: {
    flex: 1,
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
  card: {
    flex: 1,
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
  cardDecoration: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  cardCircle1: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: -50,
    right: -30,
  },
  cardCircle2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    bottom: -40,
    left: -20,
  },
  glassOverlay: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconGlow: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: -10,
    left: -10,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 18,
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
  statsContainer: {
    marginTop: 16,
    marginBottom: 16,
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
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "800",
    color: "#00d4ff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export default CategoryScreen;
