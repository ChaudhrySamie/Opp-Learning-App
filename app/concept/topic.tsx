import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { oopConcepts } from '../data/oopConcepts';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import InteractiveCodeBlock from '../../components/InteractiveCodeBlock';

const { width } = Dimensions.get('window');

// --- Animated Section Wrapper ---
const FadeInView = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      delay,
      tension: 40,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ 
      opacity: animatedValue, 
      transform: [{ translateY: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }] 
    }}>
      {children}
    </Animated.View>
  );
};

const TopicDetailScreen = () => {
  const { topic } = useLocalSearchParams();
  const router = useRouter();
  const topicStr = Array.isArray(topic) ? topic[0] : topic;
  const topicData = oopConcepts.find(item => item.id === topicStr?.toLowerCase());

  if (!topicData) {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 20 }}>
          <Ionicons name="arrow-back" size={28} color="#f97316" />
        </TouchableOpacity>
        <Text style={styles.errorText}>Topic not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* --- PREMIUM CUSTOM HEADER --- */}
      <View style={styles.customHeader}>
        <SafeAreaView edges={['top']} />
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#f97316" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerLabel}>LEARNING MODULE</Text>
            <Text style={styles.headerTitle} numberOfLines={1}>{topicData.title}</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- EXPLANATION --- */}
        {topicData.content && (
          <FadeInView delay={100}>
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <Ionicons name="book-outline" size={22} color="#f97316" />
                <Text style={styles.sectionTitle}>Explanation</Text>
              </View>
              <Text style={styles.content}>{topicData.content}</Text>
            </View>
          </FadeInView>
        )}

        {/* --- CODE EXAMPLE (MODERN IDE LOOK) --- */}
        {topicData.codeExample && (
          <FadeInView delay={200}>
            <InteractiveCodeBlock initialCode={topicData.codeExample} language="cpp" title="Interactive Implementation" />
          </FadeInView>
        )}

        {/* --- DYNAMIC SECTIONS (CONDITIONAL) --- */}
        {[
          { key: 'extraExplanation', label: 'In-Depth Look', icon: 'bulb-outline', type: 'text' },
          { key: 'multipleObjectsExample', label: 'Interactive: Multiple Objects', icon: 'copy-outline', type: 'code' },
          { key: 'multilevelExample', label: 'Interactive: Multilevel Inheritance', icon: 'layers-outline', type: 'code' },
          { key: 'multipleInheritanceExample', label: 'Interactive: Multiple Inheritance', icon: 'copy-outline', type: 'code' },
          { key: 'accessSpecifiersExample', label: 'Interactive: Access Specifiers', icon: 'shield-checkmark-outline', type: 'code' },
          { key: 'outsideDefinitionExample', label: 'Interactive: Outside Definition', icon: 'code-outline', type: 'code' },
        ].map((item, index) => {
          const val = topicData[item.key as keyof typeof topicData];
          if (!val) return null;

          return (
            <FadeInView key={item.key} delay={300 + index * 50}>
              {item.type === 'code' ? (
                <InteractiveCodeBlock initialCode={val as string} language="cpp" title={item.label} />
              ) : (
                <View style={styles.card}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name={item.icon as any} size={22} color="#f97316" />
                    <Text style={styles.sectionTitle}>{item.label}</Text>
                  </View>
                  <Text style={styles.content}>{val as string}</Text>
                </View>
              )}
            </FadeInView>
          );
        })}

        {/* --- CHALLENGE TASK --- */}
        {topicData.challenge && (
          <FadeInView delay={500}>
            <View style={styles.challengeCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="rocket-outline" size={22} color="#9a3412" />
                <Text style={[styles.sectionTitle, { color: '#9a3412' }]}>Challenge</Text>
              </View>
              <Text style={styles.challengeText}>{topicData.challenge}</Text>
            </View>
          </FadeInView>
        )}

        {/* --- AI CHAT TUTOR --- */}
        <FadeInView delay={550}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.aiButton}
            onPress={() => router.push({ pathname: '/concept/aiChat', params: { topic: topicData.title } })}
          >
            <LinearGradient 
              colors={['#8b5cf6', '#6d28d9']} 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 1 }} 
              style={styles.gradientButton}
            >
              <Text style={styles.quizButtonText}>Ask AI Teacher 🤖</Text>
              <Ionicons name="chatbubbles-outline" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </FadeInView>

        {/* --- QUIZ ACTION --- */}
        <FadeInView delay={650}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.quizButton}
            onPress={() => router.push({ pathname: '/(tabs)/explore', params: { topic: topicData.id } })}
          >
            <LinearGradient 
              colors={['#f97316', '#ea580c']} 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 0 }} 
              style={styles.gradientButton}
            >
              <Text style={styles.quizButtonText}>Test Your Knowledge</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </FadeInView>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffaf5' },
  scrollContent: { padding: 20, paddingBottom: 60 },
  errorText: { textAlign: 'center', marginTop: 50, fontSize: 18, color: '#9a3412', fontWeight: '600' },

  /* --- HEADER STYLES --- */
  customHeader: {
    backgroundColor: '#fff',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fed7aa',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff7ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: { marginLeft: 12, flex: 1 },
  headerLabel: { fontSize: 10, fontWeight: '800', color: '#9ca3af', letterSpacing: 1 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#431407' },

  /* --- CARD STYLES --- */
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#ea580c', marginLeft: 8 },
  
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fff7ed',
    shadowColor: '#f97316',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  content: { fontSize: 15, color: '#4b5563', lineHeight: 24, fontWeight: '500' },

  /* --- CODE STYLES --- */
  codeCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  codeBox: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 16,
    marginTop: 4,
  },
  codeHeader: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  codeText: { color: '#cbd5e1', fontFamily: 'monospace', fontSize: 13, lineHeight: 20 },

  /* --- MISC CARDS --- */
  challengeCard: {
    backgroundColor: '#fff7ed',
    padding: 20,
    borderRadius: 24,
    marginBottom: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#fdba74',
  },
  challengeText: { fontSize: 15, color: '#7c2d12', lineHeight: 22, fontWeight: '600' },

  /* --- BUTTONS --- */
  quizButton: { borderRadius: 20, overflow: 'hidden', elevation: 8, shadowColor: '#ea580c', shadowOpacity: 0.3, shadowRadius: 12, marginBottom: 10 },
  aiButton: { marginTop: 10, marginBottom: 15, borderRadius: 20, overflow: 'hidden', elevation: 8, shadowColor: '#7c3aed', shadowOpacity: 0.3, shadowRadius: 12 },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  quizButtonText: { color: '#fff', fontSize: 17, fontWeight: '800' },

  footerTag: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 12,
    color: '#fdba74',
    fontWeight: '700',
    letterSpacing: 0.5,
  }
});

export default TopicDetailScreen;