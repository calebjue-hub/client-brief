# Supabase Setup

## Where to find your keys

1. Go to your Supabase project dashboard: `https://supabase.com/dashboard`
2. Click on your project (hawywakiessppitljpzl or similar)
3. Open **Settings** (bottom left) → **API Keys**

## Which key to copy

You'll see one of two setups depending on your project age:

### Newer projects (2025+)
You'll see a tab **"Publishable and secret API keys"**:
- Copy the **Publishable key** (starts with `sb_publishable_...`)
- This replaces the old "anon" key
- It's safe to put in your app

### Older projects
You'll see a tab **"Legacy API Keys"**:
- Look for the one labeled **`anon`** or **`public`** key
- Copy it (starts with `eyJ...`)
- This is safe to put in your app
- (You can migrate to publishable keys anytime)

## Where to paste it

1. In your project, open `apps/client-brief/.env.example`
2. Rename it to `.env` (remove the `.example`)
3. Paste your key as the value for `EXPO_PUBLIC_SUPABASE_ANON_KEY`
4. Keep the URL line as-is (it's already correct)

**Example:**
```
EXPO_PUBLIC_SUPABASE_URL=https://hawywakiessppitljpzl.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

(Or use the `sb_publishable_...` key if that's what you see.)

## Restart Expo

After editing `.env`, restart your dev server so it picks up the change:

```bash
npx expo start -c
```

The `-c` flag clears the cache and reloads env vars.

## Email confirmation (testing only)

By default, when someone signs up:
1. They get a confirmation email
2. They have to click the link before they log in
3. The app shows "Check your inbox"

To make testing faster, you can **turn off** email confirmation temporarily:
- Dashboard → **Authentication** → **Sign In / Providers** → **Email**
- Toggle **"Confirm email"** off
- Now sign-up logs straight in
- Turn it back on before you ship the app

## That's it!

You're ready to run the app and test sign up / log in. The app wires everything automatically using the keys from `.env`.
