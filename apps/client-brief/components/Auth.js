import { useState } from 'react'
import {
  Alert,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
import { supabase } from '../lib/supabase'

function showAlert(title, message) {
  if (Platform.OS === 'web') {
    window.alert(message ? `${title}: ${message}` : title)
  } else {
    Alert.alert(title, message)
  }
}

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signIn() {
    if (!email || !password) return showAlert('Missing fields', 'Please enter your email and password.')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) showAlert('Sign in failed', error.message)
    } catch (e) {
      showAlert('Error', e.message)
    }
    setLoading(false)
  }

  async function signUp() {
    if (!email || !password) return showAlert('Missing fields', 'Please enter your email and password.')
    setLoading(true)
    try {
      const { data: { session }, error } = await supabase.auth.signUp({ email, password })
      if (error) showAlert('Sign up failed', error.message)
      else if (!session) showAlert('Almost there', 'Check your inbox to confirm your email, then log in.')
    } catch (e) {
      showAlert('Error', e.message)
    }
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>The Client Brief</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9a988f"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9a988f"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        onPress={signIn}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Log in</Text>}
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.btn, styles.btnAlt, pressed && styles.btnAltPressed]}
        onPress={signUp}
        disabled={loading}
      >
        <Text style={[styles.btnText, styles.btnAltText]}>Create account</Text>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 30, fontWeight: '800', color: '#1d2748', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#8a887f', textAlign: 'center', marginTop: 4, marginBottom: 28 },
  input: {
    borderWidth: 1,
    borderColor: '#e3e1da',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    color: '#1b1a17',
  },
  btn: {
    backgroundColor: '#1d2748',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    cursor: 'pointer',
  },
  btnPressed: { opacity: 0.7 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnAlt: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#1d2748' },
  btnAltPressed: { opacity: 0.7, backgroundColor: '#f0f0f0' },
  btnAltText: { color: '#1d2748' },
})
