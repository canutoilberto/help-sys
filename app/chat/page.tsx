"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Video, Paperclip, Send, Search, LogOut } from "lucide-react";
import Link from "next/link";

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "user",
      content: "Olá, estou com um problema no meu computador.",
      timestamp: "10:00",
    },
    {
      id: 2,
      sender: "support",
      content:
        "Olá! Sinto muito ouvir isso. Pode me dar mais detalhes sobre o problema?",
      timestamp: "10:02",
    },
    {
      id: 3,
      sender: "user",
      content: "Meu computador está muito lento e às vezes trava.",
      timestamp: "10:05",
    },
    {
      id: 4,
      sender: "support",
      content:
        "Entendo. Vamos tentar algumas coisas para resolver isso. Primeiro, quando foi a última vez que você reiniciou o computador?",
      timestamp: "10:07",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 bg-white shadow-sm rounded-lg p-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Suporte TI" />
              <AvatarFallback>TI</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h1 className="text-lg font-semibold">Suporte TI</h1>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Buscar na conversa" className="pl-8" />
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sair do chat
              </Button>
            </Link>
          </div>
        </header>

        <main className="bg-white shadow-sm rounded-lg overflow-hidden">
          <ScrollArea className="h-[calc(100vh-16rem)] p-4">
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

          <footer className="bg-white p-4 border-t">
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
        </main>
      </div>
    </div>
  );
}
