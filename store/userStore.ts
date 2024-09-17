import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  createUserInFirestore: (user: User) => Promise<void>;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
        if (user) {
          localStorage.setItem("user-storage", JSON.stringify(user));
        } else {
          localStorage.removeItem("user-storage");
        }
      },
      createUserInFirestore: async (user) => {
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            email: user.email,
            displayName: user.displayName,
            createdAt: new Date(),
          },
          { merge: true }
        );
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage, // Define o armazenamento como localStorage
    }
  )
);
