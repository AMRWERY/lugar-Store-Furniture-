import { auth, db } from "@/firebase/config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    user: null,
    isOverlayVisible: false,
  }),

  actions: {
    async init() {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          this.user = user;
          // Optional: Sync with Firestore
          const docSnap = await getDoc(doc(db, "users", user.uid));
          if (docSnap.exists()) {
            localStorage.setItem("user", JSON.stringify(docSnap.data()));
          }
        } else {
          this.user = null;
          localStorage.removeItem("user");
        }
      });
    },

    async loginUser({ email, password }) {
      this.isOverlayVisible = true;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const userData = {
          uid: user.uid,
          email: user.email,
          createdAt: new Date(),
        };
        this.user = user;
        await setDoc(doc(db, "users", user.uid), userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setTimeout(() => {
          this.isOverlayVisible = false;
        }, 3000);
        this.error = null;
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    },

    async logoutUser() {
      this.isOverlayVisible = true;
      try {
        await signOut(auth);
        this.user = null;
        this.role = null;
        this.error = null;
        localStorage.clear();
        setTimeout(() => {
          this.isOverlayVisible = false;
        }, 3000);
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
