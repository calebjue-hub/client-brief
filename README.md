# Client Brief Workspace

A ready-to-open folder for Claude Code. Contains your Client Brief mobile app and Supabase auth setup.

## What's here

```
apps/
  ├── client-brief/           The mobile news dashboard (Expo React Native)
  │   ├── App.js              (already has Supabase auth wired in)
  │   ├── lib/supabase.js      Supabase client config
  │   ├── components/Auth.js   Login screen
  │   └── ...
  └── (add your other Expo projects here)

docs/
  ├── CLIENT_BRIEF_SETUP.md    How to run The Client Brief
  └── SUPABASE_SETUP.md        How to configure Supabase keys
```

## How to use this in Claude Code

1. **Download** this entire folder to your computer (e.g., Desktop or Documents).
2. **Open Claude Code** (the desktop app or command line).
3. Select **File → Open Folder** and choose this `client-brief-workspace` folder.
4. Claude Code will now work inside this folder — no more "working directory no longer exists" errors.

## Quick start: The Client Brief (Expo app)

```bash
cd apps/client-brief

# 1. Install dependencies
npm install
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill

# 2. Add your Supabase key
# Edit .env and paste your anon/publishable key from the dashboard

# 3. Run it
npx expo start -c
```

See `docs/SUPABASE_SETUP.md` for where to find your key.

## Next steps

- **Replace the placeholder MainApp**: Your current app logic goes in `apps/client-brief/components/MainApp.js`.
- **Test sign up/log in** with a test email (email confirmation is on by default).
- **Add your real screens**: Once authenticated, users land on `<MainApp />` — that's where your dashboard, settings, etc. go.

---

**Need help?** Ask Claude Code (in this folder) to guide you through any step.
