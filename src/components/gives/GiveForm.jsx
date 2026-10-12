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

  const inputClass =
    "w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3.5 text-base text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 sm:px-5 sm:py-4";

  if (success) {
    return (
      <div className="animate-fade-in relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-2xl sm:p-10">
        <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-emerald-500 to-teal-400" />
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">God Bless You!</h2>
        <p className="mb-8 text-gray-600">
          Your donation has been received and verified.
        </p>
        <button
          onClick={() => { setSuccess(false); setStep(1); }}
          className="w-full rounded-full bg-blue-50 px-8 py-3 font-bold text-blue-700 transition hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-95 sm:w-auto"
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
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-3xl bg-white/85 backdrop-blur-sm">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700"></div>
          <p className="font-bold text-blue-800">Finalizing donation...</p>
        </div>
      )}

      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-2xl sm:p-8 md:p-10">
        <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400"></div>

        <h2 className="mb-5 text-center text-xl font-black uppercase tracking-tight text-blue-800 sm:text-2xl">
         Online Giving
        </h2>

        {/* Step indicator (display only) */}
        <div className="mb-7 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider sm:mb-8">
          <span className="flex items-center gap-2 text-blue-700">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-[11px] text-white">
              {step === 1 ? "1" : "✓"}
            </span>
            Amount
          </span>
          <span
            aria-hidden="true"
            className={`h-0.5 w-8 rounded-full sm:w-12 ${step === 2 ? "bg-blue-700" : "bg-gray-200"}`}
          />
          <span
            className={`flex items-center gap-2 ${step === 2 ? "text-blue-700" : "text-gray-400"}`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                step === 2 ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </span>
            Details
          </span>
        </div>

        {step === 1 ? (
          <div className="animate-fade-in space-y-6">
             {/* Type Selection */}
             <div>
               <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                 I'm giving
               </p>
               <div className="grid grid-cols-3 gap-2 rounded-2xl bg-gray-100 p-1.5">
                {["Tithe", "Offering", "Special"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFormData({ ...formData, type: t })}
                    aria-pressed={formData.type === t}
                    className={`rounded-xl py-3 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:text-sm ${
                      formData.type === t
                        ? "bg-white text-blue-700 shadow-md ring-1 ring-blue-100"
                        : "text-gray-500 hover:text-blue-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Grid */}
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                Choose an amount
              </p>
              <div className="grid grid-cols-2 gap-2.5 min-[420px]:grid-cols-3 sm:gap-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setFormData({ ...formData, amount: amt })}
                    aria-pressed={Number(formData.amount) === amt}
                    className={`rounded-xl border-2 px-2 py-3.5 text-sm font-black transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-95 sm:text-base ${
                      Number(formData.amount) === amt
                        ? "border-blue-700 bg-blue-700 text-white shadow-lg shadow-blue-500/30"
                        : "border-transparent bg-gray-50 text-gray-700 hover:border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="give-amount"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500"
              >
                Or enter amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">₦</span>
                <input
                  id="give-amount"
                  name="amount"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter Amount"
                  className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-4 pl-10 pr-4 text-lg font-bold text-gray-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>

            <button
              disabled={!formData.amount || formData.amount <= 0}
              onClick={() => setStep(2)}
              className="w-full rounded-xl bg-blue-700 py-4 font-black tracking-wide text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
            >
              CONTINUE
            </button>
          </div>
        ) : (
          <div className="animate-fade-in space-y-5">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center text-sm font-bold text-gray-600 transition-colors hover:text-blue-600 focus:outline-none focus-visible:underline"
            >
              ← BACK TO AMOUNT
            </button>

            <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-5">
              <span className="font-bold text-gray-600">{formData.type}</span>
              <span className="text-2xl font-black text-gray-900 sm:text-3xl">₦{Number(formData.amount).toLocaleString()}</span>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="give-name"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500"
                >
                  Full Name
                </label>
                <input
                  id="give-name"
                  name="name"
                  autoComplete="name"
                  type="text"
                  placeholder="Full Name"
                  className={inputClass}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="give-email"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500"
                >
                  Email Address
                </label>
                <input
                  id="give-email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  placeholder="Email Address"
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
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
              <button
                disabled
                className="w-full cursor-not-allowed rounded-xl bg-gray-200 py-4 font-bold text-gray-400"
              >
                Complete
              </button>
            )}
          </div>
        )}

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-gray-400">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
            <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Payments are processed securely by Paystack
        </p>
      </div>
    </div>
  );
};

export default GiveForm;
