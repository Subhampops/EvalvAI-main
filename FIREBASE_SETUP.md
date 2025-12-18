# Firebase Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter project name (e.g., "EvalvAI")
   - (Optional) Enable Google Analytics
   - Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Register your app:
   - App nickname: "EvalvAI Web"
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"

3. **Copy the Firebase configuration** - you'll see something like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Step 3: Enable Authentication Methods

1. In the Firebase Console, go to **Build > Authentication**
2. Click "Get started" if this is your first time
3. Go to the **Sign-in method** tab
4. Enable the following providers:

### Email/Password
- Click on "Email/Password"
- Toggle "Enable"
- Click "Save"

### Google
- Click on "Google"
- Toggle "Enable"
- Select a support email from the dropdown
- Click "Save"

### Anonymous (for Guest Mode)
- Click on "Anonymous"
- Toggle "Enable"
- Click "Save"

## Step 4: Configure Your Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

## Step 5: Configure Authorized Domains

1. In Firebase Console, go to **Authentication > Settings**
2. Scroll to **Authorized domains**
3. Add your domains:
   - `localhost` (already added by default)
   - Your production domain (e.g., `evalvai.vercel.app`)

## Step 6: Restart Your Development Server

After updating `.env.local`:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Step 7: Test Authentication

1. Navigate to `http://localhost:3000/sign-up`
2. Create a test account with email/password
3. Check Firebase Console > Authentication > Users to see the new user
4. Test sign-in, Google auth, and guest mode

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure all environment variables are set correctly in `.env.local`
- Restart your development server after changing `.env.local`

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to Authorized domains in Firebase Console
- For localhost, make sure it's listed (it should be by default)

### Google Sign-In Not Working
- Verify Google provider is enabled in Firebase Console
- Check that you selected a support email
- Make sure your domain is authorized

### Users Can't Sign In
- Check Firebase Console > Authentication > Users
- Verify the authentication method is enabled
- Check browser console for detailed error messages

## Security Rules (Optional)

For production, consider setting up Firestore security rules if you plan to store user data:

1. Go to **Firestore Database > Rules**
2. Set appropriate read/write rules based on authentication

## Next Steps

- Set up email verification (optional)
- Configure password reset functionality
- Add custom claims for admin users
- Set up Firebase Analytics
- Configure Firebase Hosting for deployment

## Support

For more information, visit:
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
