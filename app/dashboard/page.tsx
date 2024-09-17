"use client";

import { useUserStore } from "@/store/userStore";
import { ProtectedLayout } from "@/components/ProtectedLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Laptop,
  Wifi,
  HardDrive,
  Printer,
  Headphones,
  Mail,
  Lock,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const issues = [
  {
    title: "Problemas com Hardware",
    description: "Computadores, laptops, periféricos",
    icon: Laptop,
  },
  {
    title: "Problemas de Rede",
    description: "Conexão Wi-Fi, internet lenta",
    icon: Wifi,
  },
  {
    title: "Problemas de Software",
    description: "Instalação, atualizações, erros",
    icon: HardDrive,
  },
  {
    title: "Problemas de Impressão",
    description: "Configuração, papel preso, qualidade",
    icon: Printer,
  },
  {
    title: "Problemas de Áudio/Vídeo",
    description: "Chamadas, videoconferências",
    icon: Headphones,
  },
  {
    title: "Problemas de E-mail",
    description: "Configuração, spam, sincronização",
    icon: Mail,
  },
  {
    title: "Segurança e Acesso",
    description: "Senhas, permissões, antivírus",
    icon: Lock,
  },
  {
    title: "Outros Problemas",
    description: "Questões não listadas",
    icon: HelpCircle,
  },
];

export default function DashboardPage() {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user-storage"); // Limpa o localStorage
      router.push("/auth/login");
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  useEffect(() => setMounted(true), []);

  const filteredIssues = useMemo(
    () =>
      issues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  return (
    <ProtectedLayout>
      {mounted && (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900">Suporte TI</h1>
              <div className="flex items-center space-x-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Buscar problemas"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <span className="hidden lg:block">
                    Olá, {user?.displayName}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </header>

            <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredIssues.map((issue, index) => (
                <Card key={index} className="flex flex-col justify-between">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <issue.icon className="h-6 w-6 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{issue.title}</CardTitle>
                        <CardDescription>{issue.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Solicitar Ajuda</Button>
                  </CardContent>
                </Card>
              ))}
            </main>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
}
