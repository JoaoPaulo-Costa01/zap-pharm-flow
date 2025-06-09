
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CreditCard, MapPin } from 'lucide-react';

const Options = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const handleSave = () => {
    console.log('Dados salvos:', { address, cardNumber, expiryDate, cvv, cardHolder });
    alert('Dados salvos com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-xl font-bold text-blue-600">Opções</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Endereço de entrega */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold">Endereço de Entrega</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Endereço completo</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua, número, bairro, cidade, CEP"
                />
              </div>
            </div>
          </div>

          {/* Método de pagamento */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold">Método de Pagamento</h2>
            </div>
            
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
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button 
            onClick={handleSave}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3"
          >
            Salvar Configurações
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Options;
