
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
      text: "Olá! Sou sua assistente farmacêutica do Zap Pharm, powered by Google AI. Posso te ajudar com informações sobre medicamentos de venda livre disponíveis em nosso catálogo.\n\n⚠️ IMPORTANTE: Não realizo diagnósticos médicos nem prescrevo medicamentos. Sempre consulte um médico ou farmacêutico para orientações personalizadas.\n\nPara começar, insira sua API key do Google AI Studio abaixo.", 
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Medicamentos do catálogo para referência
  const catalogMedicines = [
    { name: 'Dipirona 500mg', price: 'R$ 8,50', indication: 'dor e febre' },
    { name: 'Paracetamol 750mg', price: 'R$ 12,90', indication: 'dor de cabeça e febre' },
    { name: 'Aspirina 500mg', price: 'R$ 9,80', indication: 'dor de cabeça' },
    { name: 'Ibuprofeno 600mg', price: 'R$ 15,30', indication: 'dor e inflamação' }
  ];

  useEffect(() => {
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
        text: "✅ API key configurada com sucesso! Agora posso te ajudar com informações sobre medicamentos. Como posso te auxiliar hoje?",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const createSystemPrompt = () => {
    const medicineList = catalogMedicines.map(med => 
      `${med.name} (${med.price}) - indicado para ${med.indication}`
    ).join('\n');

    return `Você é uma assistente farmacêutica virtual do Zap Pharm, especializada em fornecer informações educativas sobre medicamentos de venda livre.

REGRAS IMPORTANTES - SEMPRE SEGUIR:
1. 🚫 NUNCA faça diagnósticos médicos
2. 🚫 NUNCA prescreva medicamentos
3. 🚫 NUNCA substitua consulta médica
4. ✅ SEMPRE recomende consultar médico/farmacêutico
5. ✅ Seja educativa e informativa
6. ✅ Use linguagem clara e acessível
7. ✅ Mencione medicamentos do nosso catálogo quando relevante

CATÁLOGO ZAP PHARM:
${medicineList}

MODELO DE RESPOSTA:
- Sempre inicie reconhecendo a preocupação do usuário
- Deixe claro que não pode dar diagnóstico
- Forneça informações educativas gerais
- Mencione opções disponíveis no catálogo (sem prescrever)
- Sempre termine recomendando consulta profissional

EXEMPLO: "Entendo sua preocupação. Não posso indicar qual medicamento usar, pois isso exige orientação médica. Posso informar que em nosso catálogo temos opções como [medicamento] que são comumente usadas para [sintoma]. Consulte sempre um médico ou farmacêutico para a escolha adequada."`;
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
              text: `${createSystemPrompt()}\n\nPergunta do usuário: ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 20,
            topP: 0.8,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_MEDICAL",
              threshold: "BLOCK_NONE"
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'Desculpe, não consegui processar sua pergunta no momento.';
    } catch (error) {
      console.error('Erro ao chamar Gemini API:', error);
      return 'Erro ao conectar com a IA. Verifique sua API key e conexão com a internet.';
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    if (!apiKey.trim()) {
      alert('Por favor, configure sua API key do Google AI Studio primeiro!');
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
            <h1 className="text-xl font-bold text-blue-600">Assistente Farmacêutica IA</h1>
            <p className="text-gray-600 text-sm">Informações educativas sobre medicamentos</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* Configuração da API Key */}
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
              Configurar
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Obtenha sua API key gratuita em: 
            <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">
              Google AI Studio
            </a>
          </p>
        </div>

        {/* Aviso Legal */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <span className="text-yellow-600 text-xl mr-2">⚠️</span>
            <div className="text-sm text-yellow-800">
              <strong>Aviso Legal:</strong> Esta IA fornece apenas informações educativas sobre medicamentos de venda livre. 
              Não substitui consulta médica ou farmacêutica. Em conformidade com LGPD e normas da Anvisa.
            </div>
          </div>
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
              placeholder="Ex: Que opções tenho para dor de cabeça?"
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
