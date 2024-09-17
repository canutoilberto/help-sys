"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

interface AuthCheckProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthCheck({ children, fallback }: AuthCheckProps) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    if (user === null) {
      router.push("/auth/login");
    } else {
      setIsRedirecting(false);
    }
  }, [user, router]);

  if (isRedirecting) {
    return fallback || <div>Carregando...</div>;
  }

  return <>{children}</>;
}
