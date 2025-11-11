
import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner: React.FC<{ text?: string }> = ({ text = "Thinking..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-brand-dark my-8 p-4 bg-brand-secondary rounded-lg">
      <Loader className="animate-spin h-10 w-10 text-brand-primary" />
      <p className="text-lg font-semibold">{text}</p>
    </div>
  );
};
export default LoadingSpinner;
