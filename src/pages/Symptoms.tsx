
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Symptoms = () => {
  const navigate = useNavigate();

  const symptoms = [
    { id: 1, name: 'Dor de Cabeça', icon: '🤕' },
    { id: 2, name: 'Enjoo/Náusea', icon: '🤢' },
    { id: 3, name: 'Dor de Garganta', icon: '😷' },
    { id: 4, name: 'Febre', icon: '🤒' },
    { id: 5, name: 'Dor Muscular', icon: '💪' },
    { id: 6, name: 'Dor de Barriga', icon: '😣' }
  ];

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
            <h1 className="text-xl font-bold text-blue-600">Buscar por Sintomas</h1>
            <p className="text-gray-600 text-sm">Selecione seu sintoma</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {symptoms.map((symptom) => (
            <div 
              key={symptom.id}
              onClick={() => navigate(`/symptom-medicines/${symptom.id}`)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{symptom.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{symptom.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Symptoms;
