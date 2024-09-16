"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return user ? <>{children}</> : null;
};
