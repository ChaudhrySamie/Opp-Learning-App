import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type Member = {
  name: string;
  id: string;
  image: any;
  linkedin?: string; // Add linkedin URL property
};

// --- Custom Component for Staggered Cards ---
const AnimatedMemberCard = ({ member, index }: { member: Member; index: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      delay: 400 + index * 150, // Starts after header/purpose, staggered by 150ms
      useNativeDriver: true,
      tension: 50,
      friction: 9,
    }).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  return (
    <Animated.View style={[styles.card, { opacity: animatedValue, transform: [{ translateY }] }]}>
      <View style={styles.imageContainer}>
        <Image source={member.image} style={styles.image} />
        <View style={styles.onlineBadge} />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.idLabel}>Registration ID</Text>
        <Text style={styles.idValue}>{member.id}</Text>
      </View>
      {member.linkedin ? (
        <TouchableOpacity 
          style={styles.roleTag} 
          onPress={() => Linking.openURL(member.linkedin!)}
        >
          <Text style={styles.roleText}>LinkedIn</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.roleTag}>
          <Text style={styles.roleText}  onPress={() => Linking.openURL("https://www.linkedin.com/in/mkhnizami/")}>LinkedIn</Text>
        </View>
      )}
    </Animated.View>
  );
};

const AboutScreen = () => {
  const router = useRouter();
  const headerFade = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(contentFade, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const members: Member[] = [
    { name: "Samie Tahir", id: "1277-2022", image: require("../../assets/images/samie.jpg"), linkedin: "https://www.linkedin.com/in/chaudhry-samie-tahir-106b0a269/" },
    { name: "Mustafa Moin", id: "1282-2022", image: require("../../assets/images/mustafa.jpeg"), linkedin: "https://www.linkedin.com/in/mustafamoin/" },
    { name: "Muhammad Hamza", id: "1313-2022", image: require("../../assets/images/hamza.jpeg"), linkedin: "https://www.linkedin.com/in/chaudhry-samie-tahir-106b0a269/" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* --- PREMIUM HEADER --- */}
      <Animated.View style={{ opacity: headerFade }}>
        <LinearGradient colors={["#ea580c", "#f97316"]} style={styles.customHeader}>
          <SafeAreaView edges={["top"]} />
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Development Team</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Animated.View style={{ opacity: contentFade, paddingHorizontal: 20 }}>
          
          {/* --- PURPOSE SECTION --- */}
          <View style={styles.purposeContainer}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="rocket" size={20} /> Project Purpose
            </Text>
            <View style={styles.purposeCard}>
              <Text style={styles.text}>
                This interactive platform was engineered to simplify complex OOP concepts for fellow BSCS students. 
                Built as a milestone for our <Text style={{fontWeight: '800'}}>App Development</Text> course.
              </Text>
            </View>
          </View>

          {/* --- GROUP MEMBERS --- */}
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
            <Ionicons name="people" size={20} /> The Architects
          </Text>
          {members.map((member, index) => (
            <AnimatedMemberCard key={index} member={member} index={index} />
          ))}

          {/* --- INSTRUCTOR SECTION --- */}
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
            <Ionicons name="school" size={20} /> Under Supervision
          </Text>
          <AnimatedMemberCard 
             index={4} 
             member={{ 
               name: "M. Khawaja Hassan Nizami", 
               id: "Instructor", 
               image: require("../../assets/images/instructor.jpg") 
             }} 
          />

          {/* --- FOOTER --- */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Version 1.0.0 • BSCS 22B</Text>
          </View>
          
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf5" },
  
  /* Header */
  customHeader: {
    paddingBottom: 25,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 10,
    shadowColor: "#ea580c",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
    marginLeft: 15,
  },

  /* Purpose */
  purposeContainer: { marginTop: 20 },
  sectionTitle: {
    fontSize: 18,
    color: "#431407",
    marginBottom: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  purposeCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#f97316",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  text: { color: "#4b5563", fontSize: 15, lineHeight: 24, fontWeight: "500" },

  /* Card Styles */
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#fff7ed",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  imageContainer: { position: "relative" },
  image: { width: 70, height: 70, borderRadius: 35, backgroundColor: "#eee" },
  onlineBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "#fff",
  },
  cardInfo: { flex: 1, marginLeft: 16 },
  name: { color: "#1f2937", fontSize: 17, fontWeight: "800" },
  idLabel: { color: "#9ca3af", fontSize: 10, fontWeight: "700", textTransform: "uppercase", marginTop: 4 },
  idValue: { color: "#f97316", fontSize: 13, fontWeight: "700" },
  roleTag: {
    backgroundColor: "#fff7ed",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roleText: { color: "#f97316", fontSize: 10, fontWeight: "800" },

  /* Footer */
  footer: { marginTop: 40, alignItems: "center" },
  footerText: { color: "#9ca3af", fontSize: 13, fontWeight: "600" },
  footerTag: {
    marginTop: 8,
    color: "#fdba74",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
});

export default AboutScreen;