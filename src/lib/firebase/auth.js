import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signOut, 
    signInWithPopup, 
    GoogleAuthProvider, 
    setPersistence, 
    browserLocalPersistence, 
    onAuthStateChanged,
    sendEmailVerification
    } from "firebase/auth";
import app from "$lib/firebase/firebase";
import { user, loading } from "$lib/stores/userStore";
import { goto } from "$app/navigation";
import { browser } from "$app/environment";
import { setUserProfileData } from '$lib/utils/userProfile';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

let authInitialized = false;

export async function register(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function sendVerificationEmail(user) {
    return await sendEmailVerification(user);
}

export async function checkEmailVerified() {
    if (auth.currentUser) {
        await auth.currentUser.reload();
        return auth.currentUser.emailVerified;
    }
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

                if (currentUser && currentUser.emailVerified) {
                    console.log("Auth state changed: user is signed in with verified email.");

                    // Set the user profile data in the stores
                    setUserProfileData(currentUser);

                    if (browser) {
                        // Check if the user is already in the app route or a subpage
                        const currentPath = window.location.pathname;
                        if (!currentPath.startsWith('/app')) {
                            goto("/app");
                        }
                    }
                } else if (currentUser && !currentUser.emailVerified) {
                    console.log("Auth state changed: user is signed in with unverified email.");
                    if (browser) {
                        goto("/verify-email");
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

export default auth;