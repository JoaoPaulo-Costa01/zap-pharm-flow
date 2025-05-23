
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TrackingSymptom = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mr-4"
          >
            ← Início
          </Button>
          <div>
            <h1 className="text-xl font-bold text-blue-600">Rastreamento do Pedido</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-4xl">🚚</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu pedido está indo até você!</h2>
            <p className="text-gray-600">Tempo estimado: 30-45 minutos</p>
          </div>

          {/* Simulação de mapa */}
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-gray-600">Rota do pedido até você</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-blue-600 mr-3">✅</span>
                <span>Pedido confirmado</span>
              </div>
              <span className="text-sm text-gray-500">14:15</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-blue-600 mr-3">✅</span>
                <span>Saiu para entrega</span>
              </div>
              <span className="text-sm text-gray-500">14:35</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-yellow-600 mr-3">🚚</span>
                <span>A caminho do destino</span>
              </div>
              <span className="text-sm text-gray-500">Agora</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackingSymptom;
