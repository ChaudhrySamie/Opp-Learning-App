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
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Member = {
  name: string;
  id: string;
  image: any;
};

const AboutScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const members: Member[] = [
    { name: "Samie Tahir", id: "1277-2022", image: require("../../assets/images/samie.jpg") },
    { name: "Mustafa Moin", id: "1282-2022", image: require("../../assets/images/mustafa.jpeg") },
    { name: "Muhammad Hamza", id: "1313-2022", image: require("../../assets/images/hamza.jpeg") },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f97316" barStyle="light-content" />
      
      {/* Hide default header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Custom Header like Topic.tsx */}
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About OOP App</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: 15,
          }}
        >
          <Text style={styles.sectionTitle}>📌 Purpose</Text>
          <Text style={styles.text}>
            This application helps students understand OOP concepts with interactive lessons, examples, and quizzes. Learn faster and enjoy coding! 
                 {"\n\n"}  
            This project was developed as part of our App Development course under the guidance of our instructor, Muhammad Khawaja Hussan Nizami. Throughout this journey, we gained valuable hands on experience and learned a lot about building real-world applications.
          </Text>

          <Text style={styles.sectionTitle}>👨‍💻 Group Members</Text>
          {members.map((member, index) => (
            <Animated.View
              key={index}
              style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
            >
              <Image source={member.image} style={styles.image} />
              <View>
                <Text style={styles.name}>{member.name}</Text>
                <Text style={styles.id}>ID: {member.id}</Text>
              </View>
            </Animated.View>
          ))}

          <Text style={styles.sectionTitle}>🎓 Instructor</Text>
          <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Image source={require("../../assets/images/instructor.jpg")} style={styles.image} />
            <View>
              <Text style={styles.name}>Instructor Name</Text>
              <Text style={styles.id}>Muhammad Khawaja Hassan Nizami</Text>
            </View>
          </Animated.View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Built with ❤️ by BSCS 22B students</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7ed",
  },
  /* Custom header like Topic.tsx */
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#f97316",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#c2410c",
    marginTop: 25,
    marginBottom: 12,
    fontWeight: "bold",
  },
  text: {
    color: "#f97316",
    fontSize: 16,
    lineHeight: 22,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#ffffffff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    color: "#f97316",
    fontSize: 16,
    fontWeight: "bold",
  },
  id: {
    color: "#c2410c",
    fontSize: 14,
    marginTop: 2,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
    paddingVertical: 10,
  },
  footerText: {
    color: "#f97316",
    fontWeight: "600",
  },
});