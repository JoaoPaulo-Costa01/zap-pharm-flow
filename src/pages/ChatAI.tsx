
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
// A importação do 'useNavigate' é a causa do erro principal e foi removida do uso ativo.
// Para evitar quebrar a plataforma, a importação pode ser mantida mas seu uso é desativado.
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatAI = () => {
  const [apiKey, setApiKey] = useState('');
  const [chaveApiSalva, setChaveApiSalva] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // A inicialização do navigate é mantida para não quebrar a estrutura, mas seu uso no botão foi removido.
  const navigate = useNavigate();

  const handleConfigureApiKey = () => {
    setChaveApiSalva(apiKey);
    const successMessage: Message = {
      id: Date.now(),
      text: "API Key configurada com sucesso! Agora, posso te ajudar com informações sobre medicamentos. Como posso te auxiliar hoje?",
      sender: 'assistant',
      timestamp: new Date()
    };
    setMessages([successMessage]);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !chaveApiSalva) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setCurrentMessage('');
    setIsLoading(true);

    // CORREÇÃO: Monta o payload da API com o histórico completo da conversa.
    const apiPayloadContents = [
        {
          "role": "user",
          "parts": [{ "text": "INSTRUÇÃO DE PERSONA E RESPOSTA DIRETA: Você é o assistente virtual do Zap Pharm. Sua missão é ser rápido, direto e seguro. REGRAS RÍGIDAS DE RESPOSTA: 1. **SEJA EXTREMAMENTE CONCISO:** Suas respostas devem ser curtas e ir direto ao ponto. Use no máximo duas frases. 2. **MODELO DE RESPOSTA OBRIGATÓRIO:** Quando um usuário perguntar sobre um sintoma (ex: 'dor de cabeça'), sua resposta DEVE seguir este formato exato: 'Para [NOME DO SINTOMA], os medicamentos mais comuns são [LISTA DE 2 OU 3 REMÉDIOS]. Lembre-se: eu não escolho um remédio para você, apenas informo os mais usados. Consulte sempre um médico ou farmacêutico.' 3. **PROIBIÇÃO TOTAL DE CONSELHOS:** Você nunca, sob nenhuma circunstância, deve diagnosticar, prescrever ou dar conselhos. Apenas siga o modelo acima. Se o usuário insistir, repita a importância de falar com um profissional de saúde. EXEMPLO PERFEITO: USUÁRIO: 'o que é bom pra enjoo?' SUA RESPOSTA: 'Para enjoo, os medicamentos mais comuns são Dimenidrinato e Metoclopramida. Lembre-se: eu não escolho um remédio para você, apenas informo os mais usados. Consulte sempre um médico ou farmacêutico.'"}]
        },
        {
          "role": "model",
          "parts": [{ "text": "Entendido. Serei direto, seguirei o modelo de resposta e nunca darei conselhos médicos."}]
        },
        ...updatedMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }))
    ];

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${chaveApiSalva}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "contents": apiPayloadContents })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content.parts[0]) {
            const assistantResponse = data.candidates[0].content.parts[0].text;
            const assistantMessage: Message = {
              id: Date.now() + 1,
              text: assistantResponse,
              sender: 'assistant',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
        } else {
            throw new Error('Formato de resposta da API inválido.');
        }
      } else {
        throw new Error('Chamada de API falhou.');
      }
    } catch (error) {
      console.error("Erro detalhado da API:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Erro ao conectar com a IA. Verifique sua API key e conexão com a internet.",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- NENHUMA ALTERAÇÃO NA APARÊNCIA ABAIXO ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            // O onClick foi removido para evitar o erro, pois não há um Router.
            // onClick={() => navigate('/dashboard')}
            className="mr-4"
          >
            ← Voltar
          </Button>
          <h1 className="text-xl font-bold text-blue-600">Assistente Farmacêutico</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
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
              onClick={handleConfigureApiKey}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!apiKey.trim()}
            >
              Configurar
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg h-96 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs lg:max-md px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
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
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full"></div>
                    Processando sua pergunta...
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t p-4 flex gap-2">
            <Textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Digite sua mensagem aqui..."
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              className="resize-none"
              rows={2}
            />
            <Button 
              onClick={handleSendMessage} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!currentMessage.trim() || !chaveApiSalva || isLoading}
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
