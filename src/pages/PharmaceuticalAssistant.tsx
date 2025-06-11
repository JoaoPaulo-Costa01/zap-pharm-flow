
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const PharmaceuticalAssistant = () => {
  const [apiKey, setApiKey] = useState('');
  const [chaveApiSalva, setChaveApiSalva] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfigureApiKey = () => {
    setChaveApiSalva(apiKey);
    const successMessage: Message = {
      id: messages.length + 1,
      text: "API Key configurada com sucesso! Agora, posso te ajudar com informações sobre medicamentos. Como posso te auxiliar hoje?",
      sender: 'assistant',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, successMessage]);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !chaveApiSalva) {
      return;
    }

    // Adicionar mensagem do usuário
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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${chaveApiSalva}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "contents": [
            {
              "role": "user",
              "parts": [
                {
                  "text": "INSTRUÇÃO DE PERSONA E SEGURANÇA: Você é o assistente virtual do Zap Pharm, um aplicativo de entrega de farmácia. Sua missão é ajudar os usuários, especialmente idosos e pessoas com dificuldades tecnológicas, a encontrar informações sobre produtos que não precisam de receita médica. REGRAS DE COMPORTAMENTO: 1. Linguagem: Use sempre uma linguagem muito simples, clara, paciente e amigável. Evite termos médicos complicados. 2. ESCOPO: Seu conhecimento se limita a medicamentos de venda livre (sem prescrição). 3. REGRA DE OURO - COMO RESPONDER A PEDIDOS DE RECOMENDAÇÃO: Se um usuário perguntar o que deve usar ou tomar para algum sintoma (ex: 'o que eu uso para dor de cabeça?'), você DEVE seguir este modelo de resposta em 3 partes: PARTE A (RECUSA SEGURA): Comece sempre negando a prescrição e explicando o motivo. Ex: 'Não posso indicar qual remédio você deve usar, pois isso exige a orientação de um médico ou farmacêutico.' PARTE B (INFORMAÇÃO GERAL ÚTIL): Em seguida, ofereça informações gerais sobre os tipos de produtos que as pessoas costumam procurar para aquele sintoma, sem afirmar que o usuário deve usá-los. Ex: 'No entanto, posso informar sobre as substâncias mais comuns que as pessoas buscam para dor de cabeça, como Paracetamol e Ibuprofeno, que estão disponíveis em nosso app.' PARTE C (REFORÇO DA CONSULTA): Sempre termine reforçando a necessidade de consultar um profissional. Ex: 'Por favor, consulte um profissional de saúde para escolher o mais adequado para você.'"
                }
              ]
            },
            {
              "role": "model",
              "parts": [
                {
                  "text": "Entendido. Serei um assistente prestativo, usando linguagem simples e seguindo rigorosamente a regra de não prescrever medicamentos, apenas informando sobre opções gerais e sempre recomendando a consulta a um profissional de saúde. Estou pronto para ajudar."
                }
              ]
            },
            {
              "role": "user",
              "parts": [
                {
                  "text": currentMessage
                }
              ]
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantResponse = data.candidates[0].content.parts[0].text;
        
        const assistantMessage: Message = {
          id: messages.length + 2,
          text: assistantResponse,
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('API call failed');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Erro ao conectar com a IA. Verifique sua API key e conexão com a internet.",
        sender: 'assistant',
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
          <h1 className="text-xl font-bold text-blue-600">Assistente Farmacêutico</h1>
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
              onClick={handleConfigureApiKey}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!apiKey.trim()}
            >
              Configurar
            </Button>
          </div>
        </div>

        {/* Área de Chat */}
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
          
          {/* Campo de mensagem */}
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

export default PharmaceuticalAssistant;
