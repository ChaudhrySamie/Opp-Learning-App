import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar,ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const topics = [
    { name: 'Classes', icon: 'cube-outline' },
    { name: 'Objects', icon: 'apps-outline' },
    { name: 'Methods', icon: 'code-slash-outline' },
    { name: 'Constructors', icon: 'build-outline' },
    { name: 'Inheritance', icon: 'git-branch-outline' },
    { name: 'Polymorphism', icon: 'shuffle-outline' },
    { name: 'Encapsulation', icon: 'lock-closed-outline' },
    { name: 'Abstraction', icon: 'layers-outline' },
  ];

  // Function to handle topic navigation with confirmation
  const handleTopicPress = (topicName: string) => {
    router.push(`/concept/topic?topic=${topicName}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff7ed' }}>
      <SafeAreaView edges={['top']} />
      <StatusBar backgroundColor="#f97316" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔥 HERO SECTION */}
        <LinearGradient
          colors={['#f97316', '#fb923c']}
          style={styles.hero}
        >
          <Animated.Text
            style={[
              styles.header,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            Welcome 👋
          </Animated.Text>

          <Animated.Text
            style={[
              styles.subHeroText,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            Master OOP the Smart Way 🚀
          </Animated.Text>
        </LinearGradient>

        {/* 🔥 INTRO CARD */}
        <View style={styles.introCard}>
          <Text style={styles.intro}>
            Object-Oriented Programming helps you write clean, reusable, and scalable code using real-world concepts like objects and classes.
          </Text>

          
        </View>

        {/* 🔥 SECTION TITLE */}
        <Text style={styles.subHeader}>Explore Topics</Text>

        {/* 🔥 TOPICS GRID */}
        <View style={styles.topicsContainer}>
          {topics.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.topicCard}
              activeOpacity={0.85}
              onPress={() => handleTopicPress(item.name)}
            >
              <Ionicons name={item.icon as any} size={28} color="#f97316" />
              <Text style={styles.topicText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 🔥 FOOTER */}
        <View style={styles.footer}>
  <TouchableOpacity
    activeOpacity={0.7} // smooth touch feedback
    onPress={() => router.push('/screens/AboutScreen')}
  >
    <Text style={styles.footerText}>
      Built with ❤️ by BSCS 22B students — Click here
    </Text>
  </TouchableOpacity>
</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: { fontSize: 30, fontWeight: '800', color: '#fff' },
  subHeroText: { fontSize: 18, color: '#fff', marginTop: 8 },
  introCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 18,
    borderRadius: 16,
    shadowColor: '#f97316',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  intro: { fontSize: 15, color: '#f97316', lineHeight: 22, textAlign: 'center' },
  clickButton: {
    marginTop: 15,
    backgroundColor: '#f97316',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  clickButtonText: { color: '#fff', fontWeight: '700', fontSize: 16, textAlign: 'center' },
  subHeader: { fontSize: 20, fontWeight: '700', color: '#ea580c', marginLeft: 20, marginBottom: 10 },
  topicsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  topicCard: {
    width: '48%',
    backgroundColor: '#fff',
    paddingVertical: 25,
    borderRadius: 18,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  topicText: { marginTop: 8, fontSize: 15, fontWeight: '600', color: '#c2410c' },
  footer: {
  marginTop: 25,
  marginBottom: 20,
  alignItems: 'center',
},

footerText: {
  fontSize: 12,
  color:'#f97316',             // bright text color
  fontWeight: 'bold',
  textAlign: 'center',
},
});

export default HomeScreen;