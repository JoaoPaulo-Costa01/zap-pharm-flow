
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const product = {
    id: id,
    name: 'Dipirona 500mg',
    price: 'R$ 8,50',
    description: 'Analgésico e antitérmico indicado para dores e febre. Contém 20 comprimidos.',
    image: '💊'
  };

  const handleAddToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            ← Voltar
          </Button>
          <div>
            <h1 className="text-xl font-bold text-green-600">Detalhes do Produto</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-8xl">{product.image}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-3xl font-bold text-green-600">{product.price}</p>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Informações importantes:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Leia a bula antes de usar</li>
                  <li>• Mantenha fora do alcance de crianças</li>
                  <li>• Consulte seu médico em caso de dúvidas</li>
                </ul>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-green-600 hover:bg-green-700 mt-6"
                size="lg"
              >
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
