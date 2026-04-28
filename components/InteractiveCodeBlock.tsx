import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  initialCode: string;
  language?: string;
  title?: string;
}

export default function InteractiveCodeBlock({ initialCode, language = 'cpp', title = 'Implementation' }: Props) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      // Basic prep for C++ to ensure it compiles if missing headers
      let runCode = code;
      if (language === 'cpp') {
        if (!runCode.includes('#include')) {
          runCode = `#include <iostream>\n#include <string>\nusing namespace std;\n\n` + runCode;
        }
        if (!runCode.includes('main(')) {
          runCode += `\n\nint main() {\n  cout << "Compiled successfully!" << endl;\n  return 0;\n}`;
        }
      }

      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        setOutput('Error: Missing Gemini API Key in .env. Cannot simulate code execution.');
        setIsRunning(false);
        return;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "You are a strict C++ compiler and execution engine. The user will provide C++ code. If there are compilation errors, output them as GCC would. If it is valid, 'run' it and output EXACTLY what the resulting console/terminal output would be. DO NOT explain anything. DO NOT say 'Here is the output'. DO NOT wrap the output in markdown code blocks. ONLY output the raw text that would appear in standard output. If the code has no output, output 'Process finished with exit code 0'." }]
          },
          contents: [{ role: 'user', parts: [{ text: runCode }] }]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        setOutput(`API Error: ${data.error.message}`);
      } else if (data.candidates && data.candidates.length > 0) {
        let simulatedOutput = data.candidates[0].content.parts[0].text;
        // Strip markdown if the AI stubbornly adds it despite instructions
        if (simulatedOutput.startsWith('```')) {
          simulatedOutput = simulatedOutput.replace(/```[a-zA-Z]*\n?/, '').replace(/```\n?$/, '');
        }
        setOutput(simulatedOutput.trim());
      } else {
        setOutput('Error: AI returned an empty response.');
      }
    } catch (e) {
      setOutput('Network error while connecting to compiler server. Try again.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <View style={styles.codeCard}>
      <View style={styles.sectionHeader}>
        <Ionicons name="code-slash" size={22} color="#fb923c" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      
      <View style={styles.editorContainer}>
        <View style={styles.codeHeader}>
          <View style={[styles.dot, { backgroundColor: '#ff5f56' }]} />
          <View style={[styles.dot, { backgroundColor: '#ffbd2e' }]} />
          <View style={[styles.dot, { backgroundColor: '#27c93f' }]} />
        </View>
        <TextInput
          style={styles.codeInput}
          value={code}
          onChangeText={setCode}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          keyboardType="ascii-capable"
        />
      </View>

      <TouchableOpacity onPress={handleRunCode} disabled={isRunning} style={styles.runButtonWrapper} activeOpacity={0.8}>
        <LinearGradient colors={['#fb923c', '#ea580c']} style={styles.runButton}>
          {isRunning ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Ionicons name="play" size={16} color="#fff" />
              <Text style={styles.runButtonText}>Run Code</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>

      {output ? (
        <View style={styles.outputContainer}>
          <Text style={styles.outputTitle}>Terminal Output:</Text>
          <Text style={styles.outputText}>{output}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
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
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#fff', marginLeft: 8 },
  editorContainer: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    overflow: 'hidden',
  },
  codeHeader: { flexDirection: 'row', gap: 6, padding: 12, backgroundColor: '#1e293b' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  codeInput: {
    color: '#cbd5e1',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 22,
    padding: 16,
    minHeight: 180,
    textAlignVertical: 'top',
  },
  runButtonWrapper: { marginTop: 16, alignSelf: 'flex-end', borderRadius: 16, overflow: 'hidden' },
  runButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  runButtonText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  
  outputContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#000',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#27c93f',
  },
  outputTitle: { color: '#fb923c', fontWeight: '800', fontSize: 12, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  outputText: { color: '#e2e8f0', fontFamily: 'monospace', fontSize: 13, lineHeight: 20 },
});
