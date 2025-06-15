import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";

const QuizCard = ({ question, options, onOptionSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((opt, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => onOptionSelect(opt)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  option: {
    backgroundColor: Colors.secondaryLight,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default QuizCard;
