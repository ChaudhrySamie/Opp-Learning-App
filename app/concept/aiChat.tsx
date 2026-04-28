import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function AiChatScreen() {
  const router = useRouter();
  const { topic } = useLocalSearchParams();
  const topicTitle = Array.isArray(topic) ? topic[0] : (topic || "OOP Concepts");

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your AI Teacher 🤖. I'm here to help you understand ${topicTitle}. What would you like to know?`,
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setIsKeyboardOpen(true)
    );
    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setIsKeyboardOpen(false)
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const suggestions = [
    "Explain Inheritance in simple words",
    "Give a real-life example of polymorphism",
    "What is the difference between Class and Object?",
  ];

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'system',
          content: '⚠️ Missing API Key! Please add EXPO_PUBLIC_GEMINI_API_KEY to your .env file to enable the AI Teacher.'
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const geminiMessages = messages
        .filter(m => m.role !== 'system' && m.id !== 'welcome')
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

      geminiMessages.push({ role: 'user', parts: [{ text }] });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: `You are an enthusiastic, encouraging Python/C++ programming teacher. Keep answers concise, clear, and beginner-friendly. Focus on Object-Oriented Programming, specifically ${topicTitle}. Fast response, use emojis. Markdown is not fully supported, so use simple text formatting.` }]
          },
          contents: geminiMessages
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', content: `Error: ${data.error.message}` }]);
      } else if (data.candidates && data.candidates.length > 0) {
        const aiMessage = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: aiMessage }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', content: 'AI returned an empty response.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', content: 'Network error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* HEADER */}
      <View style={styles.customHeader}>
        <SafeAreaView edges={['top']} />
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#f97316" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerLabel}>AI TUTOR</Text>
            <Text style={styles.headerTitle} numberOfLines={1}>Ask AI Teacher 🤖</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.messageBubble, msg.role === 'user' ? styles.userBubble : msg.role === 'system' ? styles.systemBubble : styles.aiBubble]}>
              <Text style={msg.role === 'user' ? styles.userText : msg.role === 'system' ? styles.systemText : styles.aiText}>
                {msg.content}
              </Text>
            </View>
          ))}

          {isLoading && (
            <View style={[styles.messageBubble, styles.aiBubble, { width: 60, alignItems: 'center' }]}>
              <ActivityIndicator color="#ea580c" size="small" />
            </View>
          )}

          {/* Suggestions */}
          {messages.length === 1 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((sug, i) => (
                <TouchableOpacity key={i} style={styles.suggestionChip} onPress={() => sendMessage(sug)}>
                  <Text style={styles.suggestionText}>{sug}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* INPUT */}
        <View style={[
          styles.inputContainer,
          { paddingBottom: isKeyboardOpen ? 4 : Math.max(insets.bottom, 12) }
        ]}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask about OOP..."
            placeholderTextColor="#9ca3af"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => sendMessage(input)}
          />
          <TouchableOpacity
            style={[styles.sendButton, !input.trim() && { opacity: 0.5 }]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim()}
          >
            <LinearGradient colors={['#f97316', '#ea580c']} style={styles.sendGradient}>
              <Ionicons name="send" size={18} color="#fff" style={{ marginLeft: 2 }} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffaf5' },
  customHeader: {
    backgroundColor: '#fff',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fed7aa',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    zIndex: 10,
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

  chatArea: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 20 },

  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
  },
  userBubble: {
    backgroundColor: '#f97316',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  systemBubble: {
    backgroundColor: '#fee2e2',
    alignSelf: 'center',
    borderColor: '#fca5a5',
    borderWidth: 1,
    width: '90%',
  },

  userText: { color: '#fff', fontSize: 15, fontWeight: '500', lineHeight: 22 },
  aiText: { color: '#4b5563', fontSize: 15, fontWeight: '500', lineHeight: 22 },
  systemText: { color: '#991b1b', fontSize: 14, fontWeight: '600', textAlign: 'center' },

  suggestionsContainer: { marginTop: 20, gap: 10 },
  suggestionChip: {
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fdba74',
    padding: 12,
    borderRadius: 16,
    alignSelf: 'flex-start'
  },
  suggestionText: { color: '#c2410c', fontWeight: '600', fontSize: 14 },

  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#fed7aa',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 15,
    maxHeight: 100,
    color: '#0f172a',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: 10,
    overflow: 'hidden',
  },
  sendGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
