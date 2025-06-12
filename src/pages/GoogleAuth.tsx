
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user came from create account page or login page
  const cameFromCreateAccount = location.state?.from === 'create-account';

  const handleContinue = () => {
    console.log('Login com Google simulado:', { email, password });
    
    // Navigate based on where user came from
    if (cameFromCreateAccount) {
      navigate('/personal-data');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          {/* Google Logo Oficial */}
          <div className="flex justify-center mb-4">
            <img 
              src="https://developers.google.com/identity/images/g-logo.png" 
              alt="Google"
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Entrar com sua conta Google</h1>
          <p className="text-gray-600">Acesse o Zap Pharm</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@gmail.com"
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button 
            onClick={handleContinue} 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Continuar
          </Button>

          <div className="text-center">
            <button 
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:underline text-sm"
            >
              ← Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;
