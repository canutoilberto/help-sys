"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, FirebaseError } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/FormField";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser, createUserInFirestore } = useUserStore();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }
    if (senha.length < 6) {
      setError("A senha deve conter pelo menos 6 caracteres.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      await updateProfile(userCredential.user, { displayName: nome });
      await createUserInFirestore(userCredential.user);
      setUser(userCredential.user);
      router.push("/auth/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleFirebaseErrors(error);
      } else {
        setError("Falha no cadastro. Por favor, tente novamente.");
      }
    }
  };

  const handleFirebaseErrors = (error: FirebaseError) => {
    switch (error.code) {
      case "auth/email-alreadi-in-use":
        setError("Este email já está em uso.");
        break;
      case "auth/invalid-email":
        setError("Formato de e-mail inválido.");
        break;
      case "auth/weak-password":
        setError("A senha é muito fraca.");
        break;
      default:
        setError("Erro desconhecido. Por favor, tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-0">
      <Card className="w-full h-full sm:h-auto sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Cadastro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCadastro} className="space-y-4">
            <FormField
              id="nome"
              label="Nome"
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <FormField
              id="email"
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormField
              id="senha"
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <FormField
              id="confirmarSenha"
              label="Confirmar Senha"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <Button className="w-full mt-4" type="submit">
              Cadastrar
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-600 w-full">
            Já possui uma conta?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
