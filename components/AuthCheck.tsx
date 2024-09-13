"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

interface AuthCheckProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthCheck({ children, fallback }: AuthCheckProps) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) {
    return fallback || null;
  }

  return <>{children}</>;
}
