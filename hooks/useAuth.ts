import { useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useUserStore, ExtendedUser } from "@/store/userStore";

export function useAuth(): { user: ExtendedUser | null; loading: boolean } {
  const { user, setUser, loading, setLoading } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: User | null) => {
        if (firebaseUser) {
          // Se o usuário está autenticado, atualizamos o estado com os dados do usuário
          const extendedUser: ExtendedUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            // Adicione aqui outros campos que você possa ter em ExtendedUser
          };
          setUser(extendedUser);
        } else {
          // Se não há usuário autenticado, definimos o usuário como null
          setUser(null);
        }
        // Definimos loading como false, pois a verificação inicial foi concluída
        setLoading(false);
      }
    );

    // Limpeza da inscrição ao desmontar o componente
    return () => unsubscribe();
  }, [setUser, setLoading]);

  return { user, loading };
}
