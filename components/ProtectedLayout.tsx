"use client";

import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
    return <div>Loading...</div>; // Indicador de carregamento
  }

  return <>{children}</>;
};
