import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your accounting assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("tax") || lowerMessage.includes("filing")) {
      return "For tax-related questions, I can help you with quarterly filings, deductions, and compliance. The Q1 tax deadline is March 31st. Would you like me to show you pending tax tasks?";
    } else if (lowerMessage.includes("client") || lowerMessage.includes("portfolio")) {
      return "I can help you manage your client portfolio. You currently have 48 active clients, 12 pending, and 8 inactive. Would you like to view details for a specific client?";
    } else if (lowerMessage.includes("report") || lowerMessage.includes("analytics")) {
      return "I can generate various reports for you including financial summaries, tax compliance reports, and revenue analysis. Your Q1 revenue is $328K with a net profit of $113K. What type of report would you like to see?";
    } else if (lowerMessage.includes("checklist") || lowerMessage.includes("task")) {
      return "You have 5 active tasks remaining. The most urgent is 'Q1 Tax Filing - Acme Corp' due on March 20th. Would you like me to show you all pending tasks?";
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! How can I assist you with your accounting needs today?";
    } else if (lowerMessage.includes("help")) {
      return "I can help you with:\n• Client portfolio management\n• Tax filing and compliance\n• Financial reports and analytics\n• Task and checklist tracking\n• General accounting questions\n\nWhat would you like to know more about?";
    } else {
      return "I understand you're asking about '" + userMessage + "'. I can help you with client management, tax filing, reports, and task tracking. Could you please provide more specific details about what you need?";
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");

    // Simulate bot response with a slight delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const quickActions = [
    "Show my active clients",
    "What are my pending tasks?",
    "Generate Q1 report",
    "Tax filing deadlines",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Chat Assistant</h2>
        <p className="text-gray-600">Get instant help with your accounting tasks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-full">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Accounting Assistant</CardTitle>
                <p className="text-sm text-gray-600">Online</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <div className={`p-2 rounded-full ${message.sender === "user" ? "bg-blue-600" : "bg-gray-200"}`}>
                      {message.sender === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-700" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${message.sender === "user" ? "text-right" : ""}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              Click on any of these to get started quickly:
            </p>
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInputMessage(action);
                  setTimeout(() => handleSendMessage(), 100);
                }}
              >
                {action}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Bot className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">About the Assistant</p>
              <p className="text-sm text-blue-700 mt-1">
                This AI-powered assistant can help you with client management, tax filing, reports, and task tracking. 
                Ask questions in natural language and get instant answers about your accounting operations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
