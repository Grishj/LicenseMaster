import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from "react-native";
import axios from "axios";
import Header from "../../components/common/Header";
import { SafeAreaView } from "react-native-safe-area-context";
const QuizScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://quizapi.io/api/v1/questions?apiKey=naTWHil0XertniOe15xGkgXZ2INVQGNV57blrveO&limit=10"
        );
        const formattedQuestions = response.data.map((q) => ({
          id: q.id,
          question: q.question,
          options: Object.values(q.answers).filter((ans) => ans !== null),
          answer: Object.values(q.correct_answers).findIndex(
            (ans) => ans === "true"
          ),
          reason: q.explanation || "No explanation provided.",
        }));
        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch questions. Please try again.");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && selected === null) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && selected === null) {
      handleNext();
    }
  }, [timeLeft, selected]);

  const handleOption = (selectedIndex) => {
    setSelected(selectedIndex);
    if (selectedIndex === questions[current].answer) {
      setScore(score + 1);
    } else {
      setScore(score - 0.25);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setTimeLeft(30);
    } else {
      navigation.replace("ResultScreen", {
        score,
        total: questions.length,
      });
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(null);
      setTimeLeft(30);
    } else {
      navigation.goBack();
    }
  };

  const renderOption = (option, index) => {
    const isSelected = selected === index;
    const isCorrect = index === questions[current].answer;
    const showResult = selected !== null;

    let optionStyle = [styles.option];
    let textStyle = [styles.optionText];

    if (showResult) {
      if (isSelected) {
        if (isCorrect) {
          optionStyle.push(styles.correctOption);
          textStyle.push(styles.correctText);
        } else {
          optionStyle.push(styles.incorrectOption);
          textStyle.push(styles.incorrectText);
        }
      } else if (isCorrect) {
        optionStyle.push(styles.correctOption);
        textStyle.push(styles.correctText);
      }
    }

    return (
      <TouchableOpacity
        key={index}
        style={optionStyle}
        onPress={() => selected === null && handleOption(index)}
        disabled={selected !== null}
        activeOpacity={0.8}
      >
        <View style={styles.optionContent}>
          <View
            style={[
              styles.optionBullet,
              isSelected &&
                showResult &&
                (isCorrect ? styles.correctBullet : styles.incorrectBullet),
            ]}
          >
            <Text
              style={[
                styles.bulletText,
                isSelected && showResult && styles.bulletTextSelected,
              ]}
            >
              {String.fromCharCode(65 + index)}
            </Text>
          </View>
          <Text style={textStyle}>{option}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Loading Quiz...</Text>
      </View>
    );
  }

  if (error || questions.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.errorText}>
          {error || "No questions available."}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[current];
  const progressWidth = `${((current + 1) / questions.length) * 100}%`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <Header
          username="Grish"
          showUsername={true}
          showBackButton={true}
          onBackPress={handleBack}
        />

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
          <Text style={styles.progressText}>
            {current + 1} of {questions.length}
          </Text>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Timer */}
          <View style={styles.timerContainer}>
            <View
              style={[styles.timerCircle, timeLeft <= 10 && styles.timerUrgent]}
            >
              <Text
                style={[
                  styles.timerText,
                  timeLeft <= 10 && styles.timerTextUrgent,
                ]}
              >
                {timeLeft}
              </Text>
            </View>
            <Text style={styles.timerLabel}>seconds left</Text>
          </View>

          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{q.question}</Text>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {q.options.map((option, index) => renderOption(option, index))}
          </View>

          {/* Explanation */}
          {selected !== null && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>💡 Explanation</Text>
              <Text style={styles.explanationText}>{q.reason}</Text>
            </View>
          )}
        </ScrollView>

        {/* Action Buttons */}
        {selected !== null && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: "#6b7280" }]}>
                ← Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: "#ffffff" }]}>
                {current === questions.length - 1 ? "Finish 🎉" : "Next →"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Match your app's background color
  },
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loadingText: {
    color: "#667eea",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "600",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  errorText: {
    fontSize: 18,
    color: "#ef4444",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "500",
  },
  retryButton: {
    backgroundColor: "#667eea",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    marginRight: 15,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ade80",
    borderRadius: 3,
  },
  progressText: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  timerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: "#667eea",
  },
  timerUrgent: {
    backgroundColor: "#fee2e2",
    borderColor: "#ef4444",
    borderWidth: 3,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#667eea",
  },
  timerTextUrgent: {
    color: "#ef4444",
  },
  timerLabel: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "500",
  },
  questionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  question: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    lineHeight: 28,
    textAlign: "center",
  },
  optionsContainer: {
    marginBottom: 25,
  },
  option: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  correctOption: {
    backgroundColor: "#f0fdf4",
    borderColor: "#22c55e",
  },
  incorrectOption: {
    backgroundColor: "#fef2f2",
    borderColor: "#ef4444",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
  },
  optionBullet: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  correctBullet: {
    backgroundColor: "#22c55e",
  },
  incorrectBullet: {
    backgroundColor: "#ef4444",
  },
  bulletText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6b7280",
  },
  bulletTextSelected: {
    color: "#ffffff",
  },
  optionText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
    fontWeight: "500",
    lineHeight: 22,
  },
  correctText: {
    color: "#166534",
    fontWeight: "600",
  },
  incorrectText: {
    color: "#dc2626",
    fontWeight: "600",
  },
  explanationContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 30,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  backButton: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    width: "45%",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  nextButton: {
    backgroundColor: "#667eea",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    width: "45%",
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
});

export default QuizScreen;
