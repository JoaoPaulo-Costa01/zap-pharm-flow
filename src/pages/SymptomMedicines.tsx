
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SymptomMedicines = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const medicines = [
    { id: 1, name: 'Dipirona 500mg', price: 'R$ 8,50', image: '💊' },
    { id: 2, name: 'Paracetamol 750mg', price: 'R$ 12,90', image: '💊' },
    { id: 3, name: 'Aspirina 500mg', price: 'R$ 9,80', image: '💊' },
    { id: 4, name: 'Ibuprofeno 600mg', price: 'R$ 15,30', image: '💊' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/symptoms')}
            className="mr-4"
          >
            ← Voltar
          </Button>
          <div>
            <h1 className="text-xl font-bold text-blue-600">Remédios para seu sintoma</h1>
            <p className="text-gray-600 text-sm">Produtos recomendados</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicines.map((medicine) => (
            <div 
              key={medicine.id}
              onClick={() => navigate(`/medicine-details/${medicine.id}`)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">{medicine.image}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{medicine.name}</h3>
              <p className="text-blue-600 font-bold text-lg">{medicine.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SymptomMedicines;
