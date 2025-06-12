
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log('Login com Google simulado:', { email, password });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          {/* Google Logo */}
          <div className="flex justify-center items-center mb-4">
            <svg width="74" height="24" viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.24 13.12v-3.003h10.043c.1.52.15 1.13.15 1.793 0 5.61-3.76 9.59-10.193 9.59-5.87 0-10.24-4.745-10.24-10.24S3.37 0.76 9.24 0.76c2.82 0 4.93 1.11 6.46 2.54L13.54 5.44c-.98-.93-2.31-1.65-4.3-1.65-3.5 0-6.24 2.82-6.24 6.46s2.74 6.46 6.24 6.46c4.03 0 5.54-2.89 5.77-4.38H9.24v-.21z" fill="#4285F4"/>
              <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.47 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#EA4335"/>
              <path d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.47 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#FBBC05"/>
              <path d="M51 6.19c-3.22 0-5.83 2.44-5.83 5.81 0 3.34 2.61 5.81 5.83 5.81 1.43 0 2.73-.49 3.72-1.4l-2.18-1.62c-.54.52-1.27.88-2.16.88-1.39 0-2.38-.63-2.79-1.79l7.1-2.94-.24-.61c-.46-1.19-1.84-3.14-4.45-3.14zm0 2.37c.89 0 1.54.44 1.79 1.06l-4.27 1.78c-.24-1.7 1.37-2.84 2.48-2.84z" fill="#34A853"/>
              <path d="M58 1v16h2.5V6.91h.1L64 16.8h1.7l3.4-9.89h.1V17h2.5V1H69L65.5 11.4h-.1L62 1h-4z" fill="#9AA0A6"/>
            </svg>
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
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline text-sm"
            >
              ← Voltar para o login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;
