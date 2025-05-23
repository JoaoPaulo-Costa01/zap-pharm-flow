
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const ChatAI = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Olá! Sou sua assistente farmacêutica. Descreva seus sintomas e posso sugerir produtos sem prescrição.", sender: 'ai' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessages = [
      ...messages,
      { id: messages.length + 1, text: currentMessage, sender: 'user' },
      { id: messages.length + 2, text: "Baseado nos sintomas que você descreveu, posso sugerir alguns produtos. Lembre-se de sempre consultar um médico para sintomas persistentes.", sender: 'ai' }
    ];

    setMessages(newMessages);
    setCurrentMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mr-4"
          >
            ← Voltar
          </Button>
          <div>
            <h1 className="text-xl font-bold text-green-600">Chat com IA</h1>
            <p className="text-gray-600 text-sm">Assistente farmacêutica virtual</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg h-96 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t p-4 flex gap-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Descreva seus sintomas..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
              Enviar
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatAI;
