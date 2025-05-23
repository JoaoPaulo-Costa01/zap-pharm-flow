
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Pharmacies = () => {
  const navigate = useNavigate();

  const pharmacies = [
    { id: 1, name: 'Farmácia Popular', distance: '0.5 km', rating: 4.8 },
    { id: 2, name: 'Drogasil', distance: '1.2 km', rating: 4.6 },
    { id: 3, name: 'Raia Drogasil', distance: '1.8 km', rating: 4.7 },
    { id: 4, name: 'Farmácia São João', distance: '2.1 km', rating: 4.5 },
    { id: 5, name: 'Ultra Popular', distance: '2.5 km', rating: 4.4 },
    { id: 6, name: 'Farmácia Preço Bom', distance: '3.0 km', rating: 4.3 }
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
            <h1 className="text-xl font-bold text-blue-600">Farmácias Parceiras</h1>
            <p className="text-gray-600 text-sm">Escolha a farmácia mais próxima</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pharmacies.map((pharmacy) => (
            <div 
              key={pharmacy.id}
              onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="w-full h-32 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🏪</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{pharmacy.name}</h3>
              <p className="text-gray-600 text-sm mb-1">📍 {pharmacy.distance}</p>
              <p className="text-yellow-500 text-sm">⭐ {pharmacy.rating}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Pharmacies;
