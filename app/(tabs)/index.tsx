import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated,
  Linking,
  Dimensions,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// --- Animated Card Component ---
const AnimatedTopicCard = ({ item, index, onPress }: any) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Staggered entry animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.topicCardWrapper,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleValue }],
        },
      ]}
    >
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => onPress(item.name)}
        style={styles.topicCard}
      >
        <LinearGradient
          colors={['#ffffff', '#fff7ed']}
          style={styles.cardGradient}
        >
          <View style={styles.iconCircle}>
            <Ionicons name={item.icon} size={24} color="#f97316" />
          </View>
          <Text style={styles.topicText}>{item.name}</Text>
          <Ionicons name="chevron-forward" size={16} color="#fdba74" style={styles.arrowIcon} />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

const HomeScreen = () => {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Header Animations
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 800, useNativeDriver: true }),
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

  const videos = [
    { title: 'OOP in 06 Minutes', url: 'https://youtu.be/g-ZNUL96uMw?si=9T8RRvQ2sb7VTnni' },
    { title: 'OOP Concepts Explained', url: 'https://youtu.be/zCja0Jd52KU?si=Q3ZPU_Xy3gviNbKN' },
  ];

  const openVideo = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f97316" barStyle="light-content" />
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* 🔥 MODERN HERO SECTION */}
        <LinearGradient colors={['#f97316', '#ea580c', '#c2410c']} style={styles.hero}>
          <SafeAreaView />
          <Animated.View style={{ opacity: headerFade, transform: [{ translateY: headerSlide }] }}>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.welcomeText}>Hello, Learner 👋</Text>
                <Text style={styles.headerTitle}>Master OOP{"\n"}The Smart Way 🚀</Text>
              </View>
              {/* <TouchableOpacity style={styles.profileBtn}>
                <Ionicons name="person-circle-outline" size={40} color="#fff" />
              </TouchableOpacity> */}
            </View>
            
            
          </Animated.View>
        </LinearGradient>

       {/* --- INTRO CARD --- */}
        <Animated.View style={[styles.introCard, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
          <Ionicons name="bulb" size={20} color="#f97316" style={{ marginBottom: 8 }} />
          <Text style={styles.introText}>
            Object-Oriented Programming helps you write clean, reusable, and scalable code using real-world concepts like objects and classes.
          </Text>
        </Animated.View>

        {/* 🔥 TOPICS GRID */}
        <View style={styles.sectionHeader}>
          <Text style={styles.subHeader}>Core Concepts</Text>
        
        </View>

        <View style={styles.topicsContainer}>
          {topics.map((item, index) => (
            <AnimatedTopicCard 
              key={index} 
              item={item} 
              index={index} 
              onPress={(name: string) => router.push(`/concept/topic?topic=${name}`)} 
            />
          ))}
        </View>

        {/* 🎥 VIDEO SECTION */}
        <Text style={styles.subHeader2}>Visual Learning 🎥</Text>
        <View style={styles.videoContainer}>
          {videos.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={styles.videoCard}
              activeOpacity={0.9}
              onPress={() => openVideo(video.url)}
            >
              <View style={styles.videoIconBg}>
                <Ionicons name="play" size={24} color="#fff" />
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoText}>{video.title}</Text>
                <Text style={styles.videoSub}>Premium Tutorial • YouTube</Text>
              </View>
              <Ionicons name="bookmark-outline" size={20} color="#f97316" />
            </TouchableOpacity>
          ))}
        </View>

        {/* 🔥 FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity 
             style={styles.footerButton}
             onPress={() => router.push('/screens/AboutScreen')}
          >
            <Text style={styles.footerText}>
              Built with ❤️ by BSCS 22B students - Click Here
            </Text>
            
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffaf5' },
  hero: {
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  welcomeText: { fontSize: 16, color: '#ffedd5', fontWeight: '500' },
  headerTitle: { fontSize: 30, fontWeight: '900', color: '#fff', letterSpacing: -0.5 , marginBottom: 30},
  profileBtn: { padding: 4 },
  introCard: {
    backgroundColor: '#fff',
    marginTop: -25,
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  introText: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: -25,
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#f97316',
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#fff7ed' },
  statNum: { fontSize: 18, fontWeight: '800', color: '#f97316' },
  statLabel: { fontSize: 12, color: '#9a3412', marginTop: 2 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 30,
    marginBottom: 15,
  },
  subHeader: { fontSize: 22, fontWeight: '800', color: '#431407' },
  subHeader2: { fontSize: 22, fontWeight: '800', color: '#431407', paddingHorizontal: 24, marginBottom: 20, marginTop: 30 },

  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  topicCardWrapper: { width: '48%', marginBottom: 16 },
  topicCard: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardGradient: {
    padding: 20,
    alignItems: 'flex-start',
    minHeight: 130,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  topicText: { fontSize: 15, fontWeight: '700', color: '#431407' },
  arrowIcon: { position: 'absolute', bottom: 15, right: 15 },

  videoContainer: { paddingHorizontal: 24, marginBottom: 20 },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fff7ed',
  },
  videoIconBg: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: { flex: 1, marginLeft: 15 },
  videoText: { fontSize: 15, fontWeight: '700', color: '#431407' },
  videoSub: { fontSize: 12, color: '#9a3412', marginTop: 2 },

  footer: { marginTop: 20, marginBottom: 40, alignItems: 'center' },
  footerButton: { alignItems: 'center', padding: 10 },
  footerText: { fontSize: 12, color: '#f97316', opacity: 0.8 },
  hashtagText: { fontSize: 14, color: '#f97316', fontWeight: '800', marginTop: 4 },
});

export default HomeScreen;