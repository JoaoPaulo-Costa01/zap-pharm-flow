
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface AboutModalProps {
  children: React.ReactNode;
}

const AboutModal = ({ children }: AboutModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Sobre o Zap Pharm</DialogTitle>
          <DialogDescription className="text-gray-600 leading-relaxed pt-4">
            O Zap Pharm é um aplicativo de entregas de medicamentos que conecta você às melhores farmácias da sua região. Com o Zap Pharm, você encontra rapidamente o remédio que precisa e recebe em casa com segurança e praticidade.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
