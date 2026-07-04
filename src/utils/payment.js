import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { PaystackButton } from "react-paystack";

// Flutterwave helper
export const FlutterwavePayment = ({ amount, currency, email, onSuccess }) => {
  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: `church-${Date.now()}`,
    amount,
    currency,
    payment_options: "card,ussd,banktransfer",
    customer: { email },
    customizations: {
      title: "Church Give",
      description: "Thank you for supporting the church",
    },
    callback: (response) => {
      onSuccess(response);
      closePaymentModal();
    },
    onClose: () => {},
  };

  return <FlutterWaveButton {...config} className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700" />;
};

// Paystack helper
export const PaystackPayment = ({ amount, email, onSuccess }) => {
  const config = {
    reference: `church-${Date.now()}`,
    email,
    amount: amount * 100, // in kobo
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    onSuccess,
    onClose: () => {},
  };

  return <PaystackButton {...config} className="bg-yellow-600 px-4 py-2 rounded text-white hover:bg-yellow-700" />;
};
