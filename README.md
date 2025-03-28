## Simple Svelte App with Firebase Auth and Firestore for user data.

- Sign in (and reset password)
- Sign up
- Protected page (for logged in users)
- Logout
- A couple of basic components
- TailwindCSS and semantic theme

**Install with**
```
npm install
```

**Add your Firebase credentials to the .env file**

```
VITE_FIREBASE_API_KEY=YourKey
VITE_FIREBASE_AUTH_DOMAIN=YourDomain
VITE_FIREBASE_PROJECT_ID=YourProjectId
VITE_FIREBASE_STORAGE_BUCKET=YourBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=YourSenderId
VITE_FIREBASE_APP_ID=YourAppId
VITE_FIREBASE_MEASUREMENT_ID=YourMeasurementId
```

**Run with**
```
npm run dev
```

**Customize theme**<br>
Go into tailwind.config.js and change the semantic theme colors.

**Deployment**<br>
Adapter for Vercel installed. Import repo in Vercel and deploy (use `dist` as build folder). For more info and other adapters, see [SvelteKit Adapters](https://svelte.dev/docs/kit/adapters).