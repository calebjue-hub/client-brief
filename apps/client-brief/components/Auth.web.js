import { useRef, useEffect, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { supabase } from '../lib/supabase'
import { getSignInPageHtml } from '../lib/getSignInPageHtml'

export default function Auth() {
  const iframeRef = useRef(null)

  const sendToIframe = useCallback((data) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(data, '*')
    }
  }, [])

  const handleMessage = useCallback(async (e) => {
    if (!e.data || !e.data.type) return

    if (e.data.type === 'signIn') {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: e.data.email,
          password: e.data.password,
        })
        if (error) {
          sendToIframe({ type: 'authError', message: error.message })
        }
      } catch (err) {
        sendToIframe({ type: 'authError', message: err.message })
      }
    }

    if (e.data.type === 'signUp') {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: e.data.email,
          password: e.data.password,
        })
        if (error) {
          sendToIframe({ type: 'authError', message: error.message })
        } else if (!data.session) {
          sendToIframe({ type: 'signUpSuccess', message: 'Check your inbox to confirm your email, then sign in.' })
        }
      } catch (err) {
        sendToIframe({ type: 'authError', message: err.message })
      }
    }
  }, [sendToIframe])

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [handleMessage])

  const html = getSignInPageHtml()

  return (
    <View style={styles.container}>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Sign In"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})
