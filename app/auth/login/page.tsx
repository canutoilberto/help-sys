"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, FirebaseError } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
  });
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFormData((prev) => ({
          ...prev,
          error: "Falha no login. Verifique suas credenciais.",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          error: "Passamos por um problema. Por favor, tente novamente.",
        }));
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-0">
      <Card className="w-full h-full sm:h-auto sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {formData.error && (
              <p className="text-red-500 text-sm">{formData.error}</p>
            )}
            <Button className="w-full" type="submit">
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-600 w-full">
            Não possui uma conta?{" "}
            <Link
              href="/auth/cadastro"
              className="text-primary hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
