import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    // Simulate account creation
    navigate('/personal-data');
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    console.log('Google login initiated');
    // In a real app, this would redirect to Google OAuth
    navigate('/personal-data');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Zap Pharm</h1>
          <p className="text-gray-600">Remédios na velocidade da luz ⚡</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
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
            Continue
          </Button>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGoogleLogin}
          >
            Entrar com Google
          </Button>

          <div className="text-center">
            <button 
              onClick={() => navigate('/forgot-password')}
              className="text-gray-500 hover:underline text-sm"
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
