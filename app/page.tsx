"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirect = () => {
      try {
        if (user) {
          router.push("/dashboard");
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Erro ao redirecionar", error);
        // Você pode adicionar uma lógica de tratamento de erro aqui
      } finally {
        setLoading(false); // Define como carregamento concluído
      }
    };

    redirect();
  }, [user, router]);

  if (loading) {
    return <div>Redirecionando...</div>; // Feedback de carregamento
  }

  return null; // Não retorna nada após o redirecionamento
}
