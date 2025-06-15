import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const sampleQuestions = [
  {
    id: 1,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    answer: 1,
    reason: "Binary search halves the search space each time, hence O(log n).",
  },
  // Add more questions here
];

const QuizScreen = ({ navigation }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const handleOption = (i) => {
    setSelected(i);
    if (i === sampleQuestions[current].answer) {
      setScore(score + 1);
    } else {
      setScore(score - 0.25);
    }
  };

  const handleNext = () => {
    if (current < sampleQuestions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      navigation.replace("ResultScreen", {
        score,
        total: sampleQuestions.length,
      });
    }
  };

  const q = sampleQuestions[current];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{q.question}</Text>
      {q.options.map((opt, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selected === index && {
              backgroundColor: index === q.answer ? "green" : "red",
            },
          ]}
          onPress={() => handleOption(index)}
          disabled={selected !== null}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
      {selected !== null && (
        <>
          <Text style={styles.reason}>Explanation: {q.reason}</Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  question: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  option: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  optionText: { fontSize: 16 },
  reason: { marginTop: 20, fontStyle: "italic", color: "#444" },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#0077cc",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});

export default QuizScreen;
