import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { quizData } from "../data/quizData";

type QuizTopics = keyof typeof quizData;

const QuizScreen = () => {
  const router = useRouter();
  const { topic } = useLocalSearchParams();
  const topicStr = Array.isArray(topic) ? topic[0] : topic;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [progressAnim] = useState(new Animated.Value(0));
  const [showResult, setShowResult] = useState(false);

  // ✅ FIXED STATE
  const [showQuitModal, setShowQuitModal] = useState(false);

  const questions = topicStr
    ? quizData[topicStr.toLowerCase() as QuizTopics] || []
    : [];

  useEffect(() => {
    // ✅ RESET EVERYTHING WHEN TOPIC CHANGES
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    progressAnim.setValue(0);
    setShowResult(false);
    setShowQuitModal(false); // 🔥 IMPORTANT FIX
  }, [topicStr]);

  const handleOptionPress = (option: string) => {
    if (!questions[currentIndex]) return;
    setSelectedOption(option);
    if (option === questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!questions[currentIndex]) return;

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);

      Animated.timing(progressAnim, {
        toValue: (currentIndex + 1) / questions.length,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    progressAnim.setValue(0);
    setShowQuitModal(false); // ✅ RESET HERE ALSO
  };

  const handleBack = () => {
    setShowQuitModal(false); // 🔥 FIX HERE
    router.replace("/(tabs)/explore");
  };

  // =========================
  // 🎯 TOPIC SCREEN
  // =========================
  if (!topicStr) {
    const allTopics = Object.keys(quizData);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff7ed" }}>
        <ScrollView>
          <LinearGradient colors={['#f97316', '#fb923c']} style={styles.hero}>
            <Text style={styles.heroTitle}>Start Quiz 🧠</Text>
            <Text style={styles.heroSubtitle}>
              Choose a topic to test your skills
            </Text>
          </LinearGradient>

          <View style={{ padding: 20 }}>
            {allTopics.map((t, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.topicCard}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/explore",
                    params: { topic: t },
                  })
                }
              >
                <Text style={styles.topicText}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.noQuizText}>
          No quiz available for this topic
        </Text>

        <TouchableOpacity onPress={handleBack} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.progressText}>
            Question {currentIndex + 1} / {questions.length}
          </Text>

          <TouchableOpacity onPress={() => setShowQuitModal(true)}>
            <Text style={styles.quitText}>Quit</Text>
          </TouchableOpacity>
        </View>

        {/* PROGRESS */}
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>

        {/* QUESTION */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            {questions[currentIndex].question}
          </Text>
        </View>

        {/* OPTIONS */}
        {questions[currentIndex].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option &&
                (option === questions[currentIndex].answer
                  ? styles.correct
                  : styles.incorrect),
            ]}
            onPress={() => handleOptionPress(option)}
            disabled={!!selectedOption}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        {/* NEXT */}
        {selectedOption && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 < questions.length ? "Next Question" : "Finish Quiz"}
            </Text>
          </TouchableOpacity>
        )}

        {/* RESULT MODAL */}
        <Modal visible={showResult} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>🎉 Quiz Completed!</Text>

              <Text style={styles.modalScore}>
                {score} / {questions.length}
              </Text>

              <Text style={styles.modalPercentage}>
                Accuracy: {((score / questions.length) * 100).toFixed(0)}%
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButtonRetry} onPress={handleRetry}>
                  <Text style={styles.modalButtonText}>Retry</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButtonBack} onPress={handleBack}>
                  <Text style={styles.modalButtonText}>Topics</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* QUIT MODAL */}
        <Modal visible={showQuitModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Leave Quiz?</Text>
              <Text style={{ marginVertical: 10 }}>
                Your progress will be lost.
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonRetry}
                  onPress={() => setShowQuitModal(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButtonBack}
                  onPress={handleBack}
                >
                  <Text style={styles.modalButtonText}>Leave</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff7ed" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  quitText: {
    color: "#dc2626",
    fontWeight: "700",
  },

  hero: {
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
  },

  heroSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },

  topicCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",
    elevation: 4,
  },

  topicText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#c2410c",
  },

  progressContainer: {
    height: 8,
    backgroundColor: "#fed7aa",
    borderRadius: 8,
    marginVertical: 10,
  },

  progressBar: {
    height: 8,
    backgroundColor: "#f97316",
    borderRadius: 8,
  },

  progressText: {
    fontSize: 14,
    color: "#f97316",
    fontWeight: "600",
  },

  questionCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  questionText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#7c2d12",
  },

  optionButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#fed7aa",
  },

  optionText: {
    fontSize: 16,
    color: "#7c2d12",
  },

  correct: {
    backgroundColor: "#ffedd5",
    borderColor: "#f97316",
  },

  incorrect: {
    backgroundColor: "#fee2e2",
    borderColor: "#dc2626",
  },

  nextButton: {
    marginTop: 20,
    backgroundColor: "#f97316",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  noQuizText: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 18,
    color: "#7c2d12",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#c2410c",
  },

  modalScore: {
    fontSize: 20,
    marginTop: 10,
  },

  modalPercentage: {
    fontSize: 16,
    marginBottom: 20,
    color: "#f97316",
  },

  modalButtons: {
    flexDirection: "row",
    width: "100%",
  },

  modalButtonRetry: {
    flex: 1,
    backgroundColor: "#fb923c",
    padding: 12,
    borderRadius: 10,
    marginRight: 5,
    alignItems: "center",
  },

  modalButtonBack: {
    flex: 1,
    backgroundColor: "#f97316",
    padding: 12,
    borderRadius: 10,
    marginLeft: 5,
    alignItems: "center",
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default QuizScreen;