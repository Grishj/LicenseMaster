import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Logo from "../../components/common/Logo";

const OnboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo size={150} />
      <Text style={styles.title}>Welcome to License Quiz Prep</Text>
      <Text style={styles.subtitle}>
        Get ready for your Computer Engineering License Exam
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("MainApp")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0077cc",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default OnboardScreen;
