# The Client Brief — Quick Start

An Expo React Native app for business intelligence. Login screen gates access, then displays a mobile news dashboard.

## Setup

1. **Install dependencies:**
   ```bash
   cd apps/client-brief
   npm install
   npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
   ```

2. **Configure Supabase:**
   - See `docs/SUPABASE_SETUP.md` for where to find your key
   - Rename `apps/client-brief/.env.example` to `.env`
   - Paste your key

3. **Run it:**
   ```bash
   npx expo start -c
   ```
   Then press `w` for web, `i` for iOS simulator, or `a` for Android emulator.

## What you get out of the box

- **Login screen** (email + password)
- **Sign up** → email confirmation (can turn off while testing)
- **Auth gate** → no session = login screen, session = app
- **Placeholder dashboard** with a "Log out" button
- **Persistent login** → restart the app, you're still logged in

## Customize it

Replace `components/MainApp.js` with your real dashboard. It receives `session` as a prop:

```jsx
export default function MainApp({ session }) {
  return (
    <View>
      <Text>Welcome, {session.user.email}</Text>
      {/* your app here */}
    </View>
  )
}
```

To log out from anywhere:
```jsx
import { supabase } from '../lib/supabase'
// ...
await supabase.auth.signOut()
// (App.js listener automatically returns to login)
```

## File reference

```
App.js                      Entry point. Gates: logged out → Auth, logged in → MainApp
lib/supabase.js             Supabase client (React Native config + AsyncStorage)
components/Auth.js          Email/password sign up + log in
components/MainApp.js       Placeholder "you're in" screen (replace this)
.env.example                Project URL + key slot
```

## Next steps

- Wire your real app into `MainApp.js`
- Enable Row Level Security in Supabase (protects data + adds auth-only tables)
- Deploy with `eas build` (Expo Application Services)

---

Have questions? Ask Claude Code in this workspace — it can help you wire features, debug, or customize screens.
