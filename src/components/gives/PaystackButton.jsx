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
    <div className="w-full">
      <button
        type="button"
        onClick={handlePayment}
        className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-800 hover:to-blue-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] sm:text-base"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 shrink-0"
        >
          <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span className="truncate">{text}</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    </div>
  );
};

export default PaystackButton;
