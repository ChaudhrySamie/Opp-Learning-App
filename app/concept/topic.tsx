import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { oopConcepts } from '../data/oopConcepts';
import { Ionicons } from '@expo/vector-icons';

const TopicDetailScreen = () => {
  const { topic } = useLocalSearchParams();
  const router = useRouter();
  const topicStr = Array.isArray(topic) ? topic[0] : topic;
  const topicData = oopConcepts.find(item => item.id === topicStr?.toLowerCase());

  if (!topicData) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 18 }}>
          Topic not found.
        </Text>
      </View>
    );
  }

  return (
    <>
      {/* ❌ Hide default header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* ✅ Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#f97316" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{topicData.title}</Text>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        
        {/* Explanation */}
        {topicData.content && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Explanation</Text>
            <Text style={styles.content}>{topicData.content}</Text>
          </View>
        )}

        {/* Code Example */}
        {topicData.codeExample && (
          <View style={styles.codeCard}>
            <Text style={styles.sectionTitle}>Code Example</Text>
            <View style={styles.codeBox}>
              <Text style={styles.code}>{topicData.codeExample}</Text>
            </View>
          </View>
        )}

        {/* Extra Explanation */}
        {topicData.extraExplanation && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Extra Explanation</Text>
            <Text style={styles.content}>{topicData.extraExplanation}</Text>
          </View>
        )}

        {/* Multilevel Example */}
        {topicData.multilevelExample && (
          <View style={styles.codeCard}>
            <Text style={styles.sectionTitle}>Multilevel Inheritance Example</Text>
            <View style={styles.codeBox}>
              <Text style={styles.code}>{topicData.multilevelExample}</Text>
            </View>
          </View>
        )}

        {/* Multiple Inheritance Example */}
        {topicData.multipleInheritanceExample && (
          <View style={styles.codeCard}>
            <Text style={styles.sectionTitle}>Multiple Inheritance Example</Text>
            <View style={styles.codeBox}>
              <Text style={styles.code}>{topicData.multipleInheritanceExample}</Text>
            </View>
          </View>
        )}

        {/* Access Specifiers Example */}
        {topicData.accessSpecifiersExample && (
          <View style={styles.codeCard}>
            <Text style={styles.sectionTitle}>Access Specifiers Example</Text>
            <View style={styles.codeBox}>
              <Text style={styles.code}>{topicData.accessSpecifiersExample}</Text>
            </View>
          </View>
        )}

        {/* Multiple Objects Example */}
        {topicData.multipleObjectsExample && (
          <View style={styles.codeCard}>
            <Text style={styles.sectionTitle}>Multiple Objects Example</Text>
            <View style={styles.codeBox}>
              <Text style={styles.code}>{topicData.multipleObjectsExample}</Text>
            </View>
          </View>
        )}

        {/* Challenge Task */}
        {topicData.challenge && (
          <View style={styles.challengeCard}>
            <Text style={styles.sectionTitle}>Challenge Task</Text>
            <Text style={styles.challengeText}>{topicData.challenge}</Text>
          </View>
        )}

        {/* Notes */}
        {topicData.usefulness && (
          <View style={styles.noteCard}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.challengeText}>{topicData.usefulness}</Text>
          </View>
        )}

        {/* Quiz Button */}
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() =>
            router.push({
              pathname: '/(tabs)/explore',
              params: { topic: topicData.id },
            })
          }
        >
          <Text style={styles.quizButtonText}>Start Quiz</Text>
        </TouchableOpacity>

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff7ed' },
  scrollContent: { padding: 20, paddingBottom: 40 },

  /* 🔥 Custom Header */
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff7ed',
    borderBottomWidth: 1,
    borderBottomColor: '#fed7aa',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#c2410c',
    marginLeft: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#ea580c',
  },

  content: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#f97316',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  codeCard: {
    backgroundColor: '#fff3e0',
    padding: 18,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#f97316',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  codeBox: {
    backgroundColor: '#f97316',
    padding: 15,
    borderRadius: 10,
    marginTop: 8,
  },

  code: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
  },

  challengeCard: {
    backgroundColor: '#fef3c7',
    padding: 18,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#f97316',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  noteCard: {
    backgroundColor: '#fff4e6',
    padding: 18,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#f97316',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  challengeText: {
    fontSize: 16,
    color: '#7c2d12',
    lineHeight: 22,
  },

  quizButton: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#c2410c',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  quizButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TopicDetailScreen;