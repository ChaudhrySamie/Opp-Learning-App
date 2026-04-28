import React, { useState, useEffect, useRef } from "react";
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
  Dimensions,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { quizData } from "../data/quizData";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');
type QuizTopics = keyof typeof quizData;

// --- Sub-component for Animated Topic Cards ---
const AnimatedTopicCard = ({ title, index, onPress }: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      delay: index * 100,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, []);

  return (
    <Animated.View style={{ 
      opacity: animatedValue, 
      transform: [{ translateY: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] 
    }}>
      <TouchableOpacity style={styles.topicCard} onPress={onPress} activeOpacity={0.9}>
        <View style={styles.topicIconContainer}>
          <Ionicons name="school-outline" size={24} color="#f97316" />
        </View>
        <Text style={styles.topicText}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#fdba74" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const QuizScreen = () => {
  const router = useRouter();
  const { topic } = useLocalSearchParams();
  const topicStr = Array.isArray(topic) ? topic[0] : topic;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [progressAnim] = useState(new Animated.Value(0));
  const [showResult, setShowResult] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);

  // Animation for Question Transition
  const questionFade = useRef(new Animated.Value(0)).current;

  const questions = topicStr ? quizData[topicStr.toLowerCase() as QuizTopics] || [] : [];

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    progressAnim.setValue(0);
    setShowResult(false);
    setShowQuitModal(false);
    animateQuestionIn();
  }, [topicStr]);

  const animateQuestionIn = () => {
    questionFade.setValue(0);
    Animated.timing(questionFade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleOptionPress = (option: string) => {
    if (!questions[currentIndex] || selectedOption) return;
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
      animateQuestionIn();
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
    setShowQuitModal(false);
    animateQuestionIn();
  };

  const handleBack = () => {
    setShowQuitModal(false);
    router.replace("/(tabs)/explore");
  };

  if (!topicStr) {
    const allTopics = Object.keys(quizData);
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient colors={['#ea580c', '#fb923c']} style={styles.hero}>
            <Text style={styles.heroTitle}>Quiz Arena</Text>
            <Text style={styles.heroSubtitle}>Choose a topic to test your expertise</Text>
          </LinearGradient>
          <View style={{ padding: 20 }}>
            {allTopics.map((t, idx) => (
              <AnimatedTopicCard 
                key={idx} 
                index={idx} 
                title={t.charAt(0).toUpperCase() + t.slice(1)} 
                onPress={() => router.push({ pathname: "/(tabs)/explore", params: { topic: t } })}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.safeCenter}>
        <Ionicons name="alert-circle-outline" size={64} color="#f97316" />
        <Text style={styles.noQuizText}>No quiz available for this topic</Text>
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
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.topicHeaderLabel}>{topicStr.toUpperCase()}</Text>
            <Text style={styles.progressText}>Question {currentIndex + 1} of {questions.length}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowQuitModal(true)} style={styles.quitButton}>
            <Text style={styles.quitText}>Quit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>

        <Animated.View style={{ opacity: questionFade, transform: [{ translateY: questionFade.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }] }}>
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{questions[currentIndex].question}</Text>
          </View>

          {questions[currentIndex].options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === questions[currentIndex].answer;
            
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={[
                  styles.optionButton,
                  isSelected && (isCorrect ? styles.correct : styles.incorrect),
                  selectedOption && !isSelected && isCorrect ? styles.correctOutline : null
                ]}
                onPress={() => handleOptionPress(option)}
                disabled={!!selectedOption}
              >
                <Text style={[styles.optionText, isSelected && styles.whiteText]}>{option}</Text>
                {isSelected && (
                  <Ionicons name={isCorrect ? "checkmark-circle" : "close-circle"} size={22} color="#fff" />
                )}
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {selectedOption && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 < questions.length ? "Continue" : "View Results"}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}

        {/* --- RESULT MODAL --- */}
        <Modal visible={showResult} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <Animated.View style={styles.modalContainer}>
              <View style={styles.modalHeaderIcon}>
                <Ionicons name="trophy" size={50} color="#f97316" />
              </View>
              <Text style={styles.modalTitle}>Quiz Completed!</Text>
              <Text style={styles.modalScoreText}>Your Score</Text>
              <Text style={styles.modalScoreValue}>{score} / {questions.length}</Text>
              
              <View style={styles.resultBadge}>
                <Text style={styles.modalPercentage}>{((score / questions.length) * 100).toFixed(0)}% Accuracy</Text>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButtonRetry} onPress={handleRetry}>
                  <Text style={styles.modalButtonText}>Retry</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonBack} onPress={handleBack}>
                  <Text style={styles.modalButtonText}>Finish</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </Modal>

        {/* --- QUIT MODAL --- */}
        <Modal visible={showQuitModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Ionicons name="exit-outline" size={48} color="#dc2626" />
              <Text style={[styles.modalTitle, { color: '#1f2937', marginTop: 10 }]}>Wait! Don't go.</Text>
              <Text style={styles.modalSubText}>Your current progress will be lost. Are you sure?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButtonSecondary} onPress={() => setShowQuitModal(false)}>
                  <Text style={styles.modalButtonTextDark}>Keep Playing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonQuit} onPress={handleBack}>
                  <Text style={styles.modalButtonText}>Exit Quiz</Text>
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
  safe: { flex: 1, backgroundColor: "#fffaf5" },
  safeCenter: { flex: 1, backgroundColor: "#fffaf5", justifyContent: 'center', alignItems: 'center', padding: 24 },
  
  hero: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  heroTitle: { fontSize: 32, fontWeight: "900", color: "#fff" },
  heroSubtitle: { fontSize: 16, color: "#ffedd5", marginTop: 4 },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  topicHeaderLabel: { fontSize: 12, fontWeight: '800', color: '#f97316', letterSpacing: 1 },
  progressText: { fontSize: 20, fontWeight: "800", color: "#431407" },
  quitButton: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#fee2e2', borderRadius: 12 },
  quitText: { color: "#dc2626", fontWeight: "700", fontSize: 13 },

  progressContainer: { height: 10, backgroundColor: "#ffedd5", borderRadius: 10, marginBottom: 24, overflow: 'hidden' },
  progressBar: { height: 10, backgroundColor: "#f97316", borderRadius: 10 },

  questionCard: { backgroundColor: "#fff", padding: 24, borderRadius: 24, marginBottom: 20, borderWidth: 1, borderColor: '#fed7aa', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  questionText: { fontSize: 18, fontWeight: "700", color: "#431407", lineHeight: 26 },

  optionButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#fff", padding: 18, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: "#fed7aa" },
  optionText: { fontSize: 16, fontWeight: '600', color: "#7c2d12", flex: 1 },
  whiteText: { color: '#fff' },
  
  correct: { backgroundColor: "#f97316", borderColor: "#f97316" },
  incorrect: { backgroundColor: "#ef4444", borderColor: "#ef4444" },
  correctOutline: { borderColor: '#f97316', borderWidth: 2 },

  nextButton: { marginTop: 10, backgroundColor: "#ea580c", padding: 18, borderRadius: 20, alignItems: "center", flexDirection: 'row', justifyContent: 'center', shadowColor: '#ea580c', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "800" },

  topicCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: "#ffffff", padding: 16, borderRadius: 20, marginBottom: 16, elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 },
  topicIconContainer: { width: 44, height: 44, backgroundColor: '#fff7ed', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  topicText: { flex: 1, fontSize: 16, fontWeight: "700", color: "#431407" },

  noQuizText: { textAlign: "center", marginTop: 20, fontSize: 18, fontWeight: '600', color: "#7c2d12", marginBottom: 20 },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", padding: 24 },
  modalContainer: { backgroundColor: "#fff", borderRadius: 32, padding: 32, alignItems: "center", shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  modalHeaderIcon: { width: 80, height: 80, backgroundColor: '#fff7ed', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 24, fontWeight: "900", color: "#431407" },
  modalSubText: { fontSize: 15, color: '#6b7280', textAlign: 'center', marginTop: 8, marginBottom: 24 },
  modalScoreText: { fontSize: 14, color: '#9a3412', fontWeight: '600', marginTop: 12 },
  modalScoreValue: { fontSize: 42, fontWeight: '900', color: '#f97316' },
  resultBadge: { backgroundColor: '#f97316', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, marginTop: 8, marginBottom: 24 },
  modalPercentage: { fontSize: 14, color: "#fff", fontWeight: "800" },
  
  modalButtons: { flexDirection: "row", width: "100%", gap: 12 },
  modalButtonRetry: { flex: 1, backgroundColor: "#fdba74", padding: 16, borderRadius: 16, alignItems: "center" },
  modalButtonBack: { flex: 1, backgroundColor: "#f97316", padding: 16, borderRadius: 16, alignItems: "center" },
  modalButtonQuit: { flex: 1, backgroundColor: "#dc2626", padding: 16, borderRadius: 16, alignItems: "center" },
  modalButtonSecondary: { flex: 1, backgroundColor: "#f3f4f6", padding: 16, borderRadius: 16, alignItems: "center" },
  modalButtonText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  modalButtonTextDark: { color: "#4b5563", fontWeight: "800", fontSize: 15 },
});

export default QuizScreen;