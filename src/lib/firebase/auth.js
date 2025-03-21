import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import app from "$lib/firebase/firebase";
import { user, loading, firstName, lastName, userEmail } from "$lib/stores/userStore";
import { goto } from "$app/navigation";
import { browser } from "$app/environment";
import { getDocument } from "$lib/firebase/firestore";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

let authInitialized = false;

export async function register(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}

export async function loginWithGoogle() {
  return await signInWithPopup(auth, googleProvider);
}

export async function logout() {
  return await signOut(auth);
}

export function initializeAuth() {
      // Prevent multiple initializations
      if (authInitialized) return;
      authInitialized = true;
  
      let unsubscribe;

      // Set persistence to browser local persistence
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
            unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                user.set(currentUser);

                if (currentUser) {
                  console.log("Auth state changed: user is signed in");
                  setUserProfileData(currentUser);
                // If user is not signed in, redirect to login page
                } else {
                  console.log("Auth state changed: no user is signed in");
                  if (browser) {
                    goto("/login");
                  }
                }

                loading.set(false);
            });
        })
        .catch((error) => {
            console.error("Error setting persistence:", error);
            loading.set(false);
        });

    // Return cleanup function
    return () => {
        if (unsubscribe) {
            unsubscribe();
            authInitialized = false;
        }
    };

}

// Set the user profile data in the stores on auth state change
async function setUserProfileData(user) {
    const userDoc = await getDocument("users", user.uid);
    firstName.set(userDoc.firstName);
    lastName.set(userDoc.lastName);
    userEmail.set(userDoc.email);
}

export default auth;