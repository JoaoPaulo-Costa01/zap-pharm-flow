
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Olá! Sou sua assistente farmacêutica powered by Gemini AI. Para começar, insira sua API key do Google AI Studio. Depois posso ajudar com informações sobre medicamentos e sintomas!", 
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar API key salva
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey);
      const newMessage: Message = {
        id: messages.length + 1,
        text: "API key salva com sucesso! Agora posso responder suas perguntas sobre medicamentos e sintomas.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const callGeminiAPI = async (message: string): Promise<string> => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Você é uma assistente farmacêutica virtual especializada em medicamentos sem prescrição. 
                     Responda de forma profissional e educativa sobre: ${message}
                     
                     IMPORTANTE: 
                     - Sempre recomende consultar um médico ou farmacêutico
                     - Não prescreva medicamentos controlados
                     - Seja claro sobre limitações e contraindicações
                     - Mantenha as respostas concisas e úteis`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'Desculpe, não consegui processar sua pergunta.';
    } catch (error) {
      console.error('Erro ao chamar Gemini API:', error);
      return 'Erro ao conectar com a IA. Verifique sua API key e conexão com a internet.';
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    if (!apiKey.trim()) {
      alert('Por favor, insira sua API key do Gemini primeiro!');
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await callGeminiAPI(currentMessage);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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
            <h1 className="text-xl font-bold text-blue-600">Chat com IA - Gemini</h1>
            <p className="text-gray-600 text-sm">Assistente farmacêutica powered by Google AI</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* Seção para API Key */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key do Google AI Studio
              </label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Cole sua API key aqui..."
                className="w-full"
              />
            </div>
            <Button 
              onClick={saveApiKey}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!apiKey.trim()}
            >
              Salvar
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Obtenha sua API key gratuita em: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google AI Studio</a>
          </p>
        </div>

        {/* Chat */}
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
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.text}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full"></div>
                    Pensando...
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t p-4 flex gap-2">
            <Textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Descreva seus sintomas ou pergunte sobre medicamentos..."
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              className="resize-none"
              rows={2}
            />
            <Button 
              onClick={handleSendMessage} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!currentMessage.trim() || !apiKey.trim() || isLoading}
            >
              Enviar
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatAI;
