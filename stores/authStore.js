import { defineStore } from "pinia";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  // updatePassword,
  getIdToken,
  // onAuthStateChanged,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isAuthenticated: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userToken: null,
      isUserLoggedIn: false,
      suggestions: [],
      showWelcomeMessage: false,
    };
  },

  actions: {
    userSignIn(payload) {
      return new Promise(async (resolve, reject) => {
        const { email, password } = payload;
        try {
          const usersCollection = collection(db, "users");
          const q = query(usersCollection, where("email", "==", email));
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            throw new Error("User not found in Firestore.");
          }
          const userData = querySnapshot.docs[0].data();
          if (userData.isBlocked) {
            // console.log(userData, "user blocked");
            throw new Error("Your account has been blocked.");
          }
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          if (user) {
            this.isAuthenticated = true;
            sessionStorage.setItem("isAuthenticated", true);
            sessionStorage.setItem("email", email);
            this.firstName = userData.firstName;
            this.lastName = userData.lastName;
            sessionStorage.setItem("firstName", userData.firstName);
            sessionStorage.setItem("lastName", userData.lastName);
            sessionStorage.setItem("username", userData.username);
            sessionStorage.setItem("userId", user.uid);
            resolve();
          } else {
            reject("User not authenticated.");
          }
        } catch (error) {
          reject(error.message || "An error occurred during login.");
        }
      });
    },

    logout() {
      return new Promise((resolve, reject) => {
        signOut(auth)
          .then(() => {
            sessionStorage.clear();
            this.isAuthenticated = false;
            resolve();
          })
          .catch((error) => {
            console.error("Logout error:", error);
            reject(error);
          });
      });
    },

    resetUserPassword(payload) {
      return new Promise(async (resolve, reject) => {
        const { email } = payload;
        try {
          await sendPasswordResetEmail(auth, email);
          // console.log("Password reset email sent successfully.");
          resolve("Success");
        } catch (error) {
          console.error("Failed to send password reset email:", error);
          reject(error);
        }
      });
    },

    setWelcomeMessageVisibility(visible) {
      this.showWelcomeMessage = visible;
    },

    setUserDetails({ firstName, lastName }) {
      this.firstName = firstName;
      this.lastName = lastName;
    },
  },

  getters: {
    getUsername: (state) => state.firstName,
    getGoogleUsername: (state) => state.username,
    getUserEmail: (state) => state.email,
    getSuggestions: (state) => state.suggestions,
    isUserAuthenticated(state) {
      return (
        state.isAuthenticated ||
        (typeof sessionStorage !== "undefined" &&
          sessionStorage.getItem("isAuthenticated") === "true")
      );
    },
    userId: () => {
      return sessionStorage.getItem("userId");
    },
  },
});
