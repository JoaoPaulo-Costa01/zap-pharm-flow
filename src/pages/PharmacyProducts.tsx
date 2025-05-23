
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PharmacyProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const products = [
    { id: 1, name: 'Dipirona 500mg', price: 'R$ 8,50', image: '💊' },
    { id: 2, name: 'Paracetamol 750mg', price: 'R$ 12,90', image: '💊' },
    { id: 3, name: 'Ibuprofeno 600mg', price: 'R$ 15,30', image: '💊' },
    { id: 4, name: 'Aspirina 500mg', price: 'R$ 9,80', image: '💊' },
    { id: 5, name: 'Dorflex', price: 'R$ 18,70', image: '💊' },
    { id: 6, name: 'Buscopan', price: 'R$ 22,40', image: '💊' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/pharmacies')}
            className="mr-4"
          >
            ← Voltar
          </Button>
          <div>
            <h1 className="text-xl font-bold text-blue-600">Farmácia {id}</h1>
            <p className="text-gray-600 text-sm">Produtos disponíveis</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div 
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">{product.image}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-blue-600 font-bold text-lg">{product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PharmacyProducts;
