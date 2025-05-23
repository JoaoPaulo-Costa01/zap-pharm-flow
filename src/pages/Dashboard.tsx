
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-green-600">Zap Pharm</h1>
          <p className="text-gray-600">Olá! O que você precisa hoje?</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => navigate('/chat-ai')}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Chat com IA</h3>
              <p className="text-gray-600 text-sm">Descreva seus sintomas e receba sugestões</p>
            </div>
          </div>

          <div 
            onClick={() => navigate('/pharmacies')}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Farmácias</h3>
              <p className="text-gray-600 text-sm">Navegue por farmácias parceiras</p>
            </div>
          </div>

          <div 
            onClick={() => navigate('/symptoms')}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🩺</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sintomas</h3>
              <p className="text-gray-600 text-sm">Busque remédios por sintoma</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Ofertas do dia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg p-4">
                <div className="w-full h-24 bg-gray-200 rounded mb-2"></div>
                <h4 className="font-medium">Remédio {item}</h4>
                <p className="text-green-600 font-bold">R$ 29,90</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
