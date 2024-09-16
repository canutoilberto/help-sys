import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ExtendedUser extends Partial<User> {
  setor?: string;
  // Adicione aqui outros campos personalizados que você possa ter
}

interface UserState {
  user: ExtendedUser | null;
  loading: boolean;
  setUser: (user: ExtendedUser | null) => void;
  setLoading: (loading: boolean) => void;
  createUserInFirestore: (user: ExtendedUser) => Promise<void>;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      loading: true,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      createUserInFirestore: async (user) => {
        if (!user || !user.uid) return;

        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            setor: user.setor,
            createdAt: new Date(),
          },
          { merge: true }
        );
      },
    }),
    {
      name: "user-storage",
    }
  )
);
