
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CreditCard } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  // Carregar dados salvos
  useEffect(() => {
    const savedData = localStorage.getItem('zapPharmUserData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setAddress(data.address || '');
      setCardNumber(data.cardNumber || '');
      setExpiryDate(data.expiryDate || '');
      setCvv(data.cvv || '');
      setCardHolder(data.cardHolder || '');
    }
  }, []);

  const handleFinalizePurchase = () => {
    console.log('Compra finalizada');
    navigate('/tracking');
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
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-xl font-bold text-blue-600">Carrinho</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* Produtos no carrinho */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Seus Produtos</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">Dipirona 500mg</h3>
                <p className="text-gray-600">Farmácia São João</p>
              </div>
              <div className="text-right">
                <p className="font-bold">R$ 8,50</p>
                <p className="text-sm text-gray-500">Qtd: 1</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-xl font-bold text-green-600">R$ 8,50</span>
          </div>
        </div>

        {/* Endereço de entrega */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Endereço de Entrega</h2>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Digite seu endereço completo"
          />
        </div>

        {/* Método de pagamento */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Método de Pagamento</h2>
          </div>
          
          <div className="space-y-4 mb-4">
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Cartão de Crédito/Débito
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                PIX
              </label>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-4">
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
                  <Label htmlFor="expiryDate">Data de validade</Label>
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
        </div>

        <Button 
          onClick={handleFinalizePurchase}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3"
        >
          Finalizar Compra
        </Button>
      </main>
    </div>
  );
};

export default Cart;
