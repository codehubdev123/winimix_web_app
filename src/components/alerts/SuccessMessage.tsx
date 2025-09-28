import React from "react";
import { CheckCircle, X } from "lucide-react";

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-center space-x-3">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-green-600 hover:text-green-800"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
