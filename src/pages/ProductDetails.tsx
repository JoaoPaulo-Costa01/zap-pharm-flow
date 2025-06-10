
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const products = [
    { id: 1, name: 'Dipirona 500mg', price: 'R$ 8,50', image: '💊', description: 'Analgésico e antitérmico indicado para dores e febre. Contém 20 comprimidos.' },
    { id: 2, name: 'Paracetamol 750mg', price: 'R$ 12,90', image: '💊', description: 'Analgésico e antitérmico de ação prolongada. Contém 30 comprimidos.' },
    { id: 3, name: 'Ibuprofeno 600mg', price: 'R$ 15,30', image: '💊', description: 'Anti-inflamatório não esteroidal para dores e inflamações. Contém 20 comprimidos.' },
    { id: 4, name: 'Aspirina 500mg', price: 'R$ 9,80', image: '💊', description: 'Ácido acetilsalicílico para dores de cabeça e febre. Contém 30 comprimidos.' },
    { id: 5, name: 'Dorflex', price: 'R$ 18,70', image: '💊', description: 'Relaxante muscular para dores nas costas e tensão. Contém 36 comprimidos.' },
    { id: 6, name: 'Buscopan', price: 'R$ 22,40', image: '💊', description: 'Antiespasmódico para cólicas e dores abdominais. Contém 20 comprimidos.' }
  ];

  const product = products.find(p => p.id === parseInt(id || '1')) || products[0];

  const handleAddToCart = () => {
    console.log('Produto adicionado ao carrinho:', product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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
            <h1 className="text-xl font-bold text-blue-600">Detalhes do Produto</h1>
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
              <p className="text-3xl font-bold text-blue-600">{product.price}</p>
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
                className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
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
