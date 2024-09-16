"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProtectedLayout } from "@/components/ProtectedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, Video, Paperclip, Send } from "lucide-react";
import Link from "next/link";

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
};

const issueTypes = {
  hardware: "Problemas com Hardware",
  network: "Problemas de Rede",
  software: "Problemas de Software",
  printing: "Problemas de Impressão",
  av: "Problemas de Áudio/Vídeo",
  email: "Problemas de E-mail",
  security: "Segurança e Acesso",
  other: "Outros Problemas",
};

export default function ChatPage() {
  const params = useParams();
  const issueId = params.id as string;
  const issueTitle =
    issueTypes[issueId as keyof typeof issueTypes] || "Suporte TI";

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Simular uma mensagem inicial baseada no tipo de problema
    setMessages([
      {
        id: 1,
        sender: "support",
        content: `Olá! Como posso ajudar você com ${issueTitle.toLowerCase()}?`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }, [issueTitle]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: "user",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <ProtectedLayout>
      <div className="flex flex-col h-screen bg-gray-100">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Suporte TI" />
              <AvatarFallback>TI</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">{issueTitle}</h1>
              <p className="text-sm text-gray-500">Suporte TI</p>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Voltar ao Dashboard
            </Button>
          </Link>
        </header>

        <ScrollArea className="flex-grow p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-50 mt-1 block">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>

        <footer className="bg-white p-4 shadow-md">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Mic className="h-4 w-4" />
              <span className="sr-only">Enviar áudio</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Video className="h-4 w-4" />
              <span className="sr-only">Iniciar videochamada</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Anexar arquivo</span>
            </Button>
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="rounded-full"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar mensagem</span>
            </Button>
          </div>
        </footer>
      </div>
    </ProtectedLayout>
  );
}
