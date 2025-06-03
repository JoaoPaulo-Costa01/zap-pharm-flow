
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password recovery email sent to:', email);
      alert(`E-mail de recuperação enviado para ${email}`);
      setIsLoading(false);
      // Redirect back to login
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600 mb-2">Recupere sua senha</h1>
          <p className="text-gray-600 text-sm">
            Digite o e-mail cadastrado e enviaremos instruções para recuperar a sua senha.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">E-mail cadastrado</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button 
            type="submit"
            disabled={!email || isLoading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3"
          >
            {isLoading ? 'Enviando...' : 'Enviar e-mail de recuperação'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              ← Voltar para o login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
