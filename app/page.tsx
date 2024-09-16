"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export default function Home() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/auth/login");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return <div>Redirecionando...</div>;
}
