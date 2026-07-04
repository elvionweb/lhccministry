// src/components/gives/PaystackButton.jsx
import React from 'react';
import { usePaystackPayment } from 'react-paystack';

const PaystackButton = ({ amount, email, onSuccess, name, type, text = "Give Now" }) => {
  // Production keys must use VITE_ prefix for Vite projects
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const config = {
    reference: `LHCC-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
    email: email ? email.trim() : '',
    amount: Math.round(amount), // Already multiplied by 100 in the parent
    publicKey,
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: name,
        },
        {
          display_name: "Giving Type",
          variable_name: "giving_type",
          value: type,
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    if (!publicKey) {
      alert("Payment gateway configuration missing. Please contact admin.");
      return;
    }
    
    initializePayment({
      onSuccess: (response) => {
        onSuccess(response);
      },
      onClose: () => {
        console.log("Payment window closed by user");
      }
    });
  };

  return (
    <div className='overflow-hidden flex items-center justify-center'>
      <button
      type="button"
      className="w-34 sm:w-60 bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-1 mt-2 tracking-wide uppercase text-sm"
      onClick={handlePayment}
    >
      {text}
    </button>
    </div>
  );
};

export default PaystackButton;
