import { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview'
import { supabase } from '../lib/supabase'
import { fetchClients, replaceAllClients, toAppFormat } from '../lib/clients'
import { getDashboardHtml } from '../lib/getDashboardHtml'

export default function MainApp({ session }) {
  const [html, setHtml] = useState(null)

  useEffect(() => {
    ;(async () => {
      let savedClients = null
      try {
        const rows = await fetchClients()
        if (rows.length > 0) {
          savedClients = rows.map(toAppFormat)
        }
      } catch (e) {
        console.warn('Could not load clients from Supabase table, falling back:', e)
      }
      setHtml(getDashboardHtml(savedClients, session?.user?.email))
    })()
  }, [])

  const saveClients = useCallback(async (clients) => {
    try {
      await replaceAllClients(clients)
    } catch (e) {
      console.warn('Failed to save clients:', e)
    }
  }, [])

  const handleMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data)
      if (data?.type === 'saveClients') saveClients(data.clients)
      else if (data?.type === 'logout') supabase.auth.signOut()
    } catch (e) {}
  }, [saveClients])

  if (!html) {
    return <View style={styles.center}><ActivityIndicator size="large" /></View>
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ html }}
        onMessage={handleMessage}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        style={styles.container}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
