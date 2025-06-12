
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
          {/* Improved Google Logo */}
          <div className="flex justify-center items-center mb-4">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* G */}
              <path d="M43.611 20.083H42V28H45.303V21.4H43.611V20.083Z" fill="#4285F4"/>
              <path d="M42 20.083C42 16.045 45.045 13 49.083 13C51.111 13 52.889 13.778 54.167 15.056L52.056 17.167C51.389 16.5 50.333 16 49.083 16C46.722 16 44.833 17.889 44.833 20.25C44.833 22.611 46.722 24.5 49.083 24.5C50.778 24.5 51.889 23.889 52.5 22.833H49.083V20.5H54.833C54.944 21 55 21.556 55 22.167C55 26.056 52.389 28 49.083 28C45.045 28 42 24.955 42 20.083Z" fill="#4285F4"/>
              
              {/* o */}
              <path d="M58 20.083C58 16.622 60.622 14 64.083 14C67.544 14 70.167 16.622 70.167 20.083C70.167 23.544 67.544 26.167 64.083 26.167C60.622 26.167 58 23.544 58 20.083ZM60.833 20.083C60.833 22.222 62.444 23.833 64.583 23.833C66.722 23.833 68.333 22.222 68.333 20.083C68.333 17.944 66.722 16.333 64.583 16.333C62.444 16.333 60.833 17.944 60.833 20.083Z" fill="#EA4335"/>
              
              {/* o */}
              <path d="M72 20.083C72 16.622 74.622 14 78.083 14C81.544 14 84.167 16.622 84.167 20.083C84.167 23.544 81.544 26.167 78.083 26.167C74.622 26.167 72 23.544 72 20.083ZM74.833 20.083C74.833 22.222 76.444 23.833 78.583 23.833C80.722 23.833 82.333 22.222 82.333 20.083C82.333 17.944 80.722 16.333 78.583 16.333C76.444 16.333 74.833 17.944 74.833 20.083Z" fill="#FBBC05"/>
              
              {/* g */}
              <path d="M86 14.333V25.5C86 29.167 83.833 30.833 81.167 30.833C78.722 30.833 77.222 29.056 76.667 27.667L78.944 26.722C79.278 27.556 80.167 28.5 81.167 28.5C82.5 28.5 83.333 27.611 83.333 25.833V24.889H83.222C82.667 25.556 81.611 26.167 80.278 26.167C77.222 26.167 74.5 23.389 74.5 20.167C74.5 16.889 77.222 14.167 80.278 14.167C81.611 14.167 82.667 14.778 83.222 15.389H83.333V14.333H86ZM83.611 20.167C83.611 18.056 82.167 16.5 80.5 16.5C78.778 16.5 77.278 18.056 77.278 20.167C77.278 22.222 78.778 23.833 80.5 23.833C82.167 23.833 83.611 22.222 83.611 20.167Z" fill="#34A853"/>
              
              {/* l */}
              <path d="M91 5V26H88.167V5H91Z" fill="#EA4335"/>
              
              {/* e */}
              <path d="M101.167 20.833C101.167 23.833 98.833 26.167 95.833 26.167C92.833 26.167 90.5 23.833 90.5 20.083C90.5 16.222 92.889 14 96 14C99 14 101.056 16.167 101.056 20V20.833H93.278C93.389 22.611 94.778 23.833 96.833 23.833C98.333 23.833 99.333 23.111 99.778 22.167L101.778 23.056C101 24.667 99.222 26.167 96.833 26.167C92.833 26.167 90.5 23.833 90.5 20.083ZM98.389 19C98.278 17.389 97.111 16.333 96 16.333C94.722 16.333 93.556 17.278 93.278 19H98.389Z" fill="#34A853"/>
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
