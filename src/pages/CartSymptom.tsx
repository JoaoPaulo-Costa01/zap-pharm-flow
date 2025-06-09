
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CartSymptom = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  // Em uma aplicação real, estes itens viriam do contexto/estado global
  const cartItems = [
    { id: 1, name: 'Dipirona 500mg', price: 8.50, quantity: 1 }
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleConfirmOrder = () => {
    if (!address.trim() || !paymentMethod) {
      alert('Por favor, preencha o endereço e selecione um método de pagamento.');
      return;
    }

    if (paymentMethod === 'credit' || paymentMethod === 'debit') {
      if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
        alert('Por favor, preencha todos os dados do cartão.');
        return;
      }
    }

    console.log('Pedido confirmado:', { cartItems, address, paymentMethod, total });
    navigate('/tracking-symptom');
  };

  const showCardFields = paymentMethod === 'credit' || paymentMethod === 'debit';

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
            <h1 className="text-xl font-bold text-blue-600">Carrinho de Compras</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Produtos no carrinho */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Seus produtos</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                </div>
                <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Dados de entrega e pagamento */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Entrega e Pagamento</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Endereço de entrega</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua, número, bairro..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="payment">Método de pagamento</Label>
                <select 
                  id="payment"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="credit">Cartão de Crédito</option>
                  <option value="debit">Cartão de Débito</option>
                  <option value="pix">PIX</option>
                  <option value="cash">Dinheiro</option>
                </select>
              </div>

              {showCardFields && (
                <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800">Dados do Cartão</h3>
                  
                  <div>
                    <Label htmlFor="cardNumber">Número do cartão</Label>
                    <Input
                      id="cardNumber"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Validade</Label>
                      <Input
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardHolder">Nome do titular</Label>
                    <Input
                      id="cardHolder"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Nome como no cartão"
                    />
                  </div>
                </div>
              )}

              <Button 
                onClick={handleConfirmOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
                size="lg"
              >
                Confirmar Pedido
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartSymptom;
