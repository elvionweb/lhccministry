// src/components/gives/GiveForm.jsx
import React, { useState } from "react";
import PaystackButton from "./PaystackButton";
import api from "../../utils/api";
import { toast } from "react-hot-toast"; // Recommended for production feedback

const GiveForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    type: "Offering",
  });
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const presetAmounts = [500, 1000, 3000, 5000, 10000, 50000];

  const handlePaymentSuccess = async (response) => {
    setIsProcessing(true);
    try {
      // Production Grade: Send the reference and amount to backend for verification
      const payload = {
        name: formData.name,
        email: formData.email,
        amount: Number(formData.amount),
        type: formData.type,
        reference: response.reference, // From Paystack
      };

      await api.post("/gives", payload);
      setSuccess(true);
      toast.success("Giving received! God bless you.");
    } catch (err) {
      console.error("Backend logging failed:", err);
      toast.error("Payment successful, but logging delayed. Please contact support.");
      // We still want to show the success ui to the user so they know their card was charged.
      setSuccess(true);
    } finally {
      setIsProcessing(false);
      setFormData({ name: "", email: "", amount: "", type: "Offering" });
    }
  };

  if (success) {
    return (
      <div className="bg-white p-8 rounded-3xl text-center animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">God Bless You!</h2>
        <p className="text-gray-600 mb-8">
          Your donation has been received and verified.
        </p>
        <button
          onClick={() => { setSuccess(false); setStep(1); }}
          className="bg-blue-50 text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-blue-100 transition"
        >
          Make another donation
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center rounded-3xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
          <p className="font-bold text-blue-800">Finalizing donation...</p>
        </div>
      )}

      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-500"></div>

        <h2 className="text-2xl font-black text-blue-800 mb-8 text-center uppercase tracking-tight">
         Online Giving
        </h2>

        {step === 1 ? (
          <div className="space-y-6 animate-fade-in">
             {/* Type Selection */}
             <div className="grid grid-cols-3 gap-2">
              {["Tithe", "Offering", "Special"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFormData({ ...formData, type: t })}
                  className={`py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                    formData.type === t ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-100 text-gray-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Amount Grid */}
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setFormData({ ...formData, amount: amt })}
                  className={`py-3 rounded-xl border-2 font-black transition-all ${
                    Number(formData.amount) === amt ? "bg-blue-700 border-blue-700 text-white" : "bg-gray-50 border-transparent text-gray-600"
                  }`}
                >
                  ₦{amt.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₦</span>
              <label htmlFor="give-amount" className="sr-only">Enter Amount</label>
              <input
                id="give-amount"
                name="amount"
                type="number"
                placeholder="Enter Amount"
                className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none font-bold text-lg transition-all"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
              disabled={!formData.amount || formData.amount <= 0}
              onClick={() => setStep(2)}
              className="w-32 bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg disabled:opacity-30 transition-transform active:scale-95"
            >
              CONTINUE
            </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-in">
            <button onClick={() => setStep(1)} className="flex items-center text-gray-600 font-bold text-sm hover:text-blue-600">
              ← BACK TO AMOUNT
            </button>

            <div className="bg-gray-50 p-5 rounded-2xl flex justify-between items-center border border-dashed border-gray-200">
              <span className="text-gray-500 font-bold">{formData.type}</span>
              <span className="text-2xl font-black text-gray-900">₦{Number(formData.amount).toLocaleString()}</span>
            </div>

            <div className="space-y-4">
              <label htmlFor="give-name" className="sr-only">Full Name</label>
              <input
                id="give-name"
                name="name"
                autoComplete="name"
                type="text"
                placeholder="Full Name"
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-blue-600 outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <label htmlFor="give-email" className="sr-only">Email Address</label>
              <input
                id="give-email"
                name="email"
                autoComplete="email"
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-blue-600 outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {formData.name && formData.email ? (
              <PaystackButton
                amount={formData.amount * 100}
                email={formData.email}
                name={formData.name}
                type={formData.type}
                onSuccess={handlePaymentSuccess}
                text={`GIVE ₦${Number(formData.amount).toLocaleString()}`}
              />
            ) : (
              <div className="flex items-center justify-center">
                <button disabled className="w-32 bg-gray-200 text-gray-400 py-4 rounded-xl font-bold">
                Complete
              </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GiveForm;
