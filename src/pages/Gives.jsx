// src/pages/Give.jsx
import React from 'react';
import GiveForm from "../components/gives/GiveForm";

const Give = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      {/* ---------- Hero ---------- */}
      <header className="relative isolate overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 px-4 pb-28 pt-28 text-center sm:pb-36 sm:pt-32">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-10 -z-10 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300 sm:text-sm">
            Online Giving
          </p>

          <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Pay your offerings, tithes and special seed
          </h1>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-amber-300" />

          <p className="mx-auto mt-6 max-w-2xl text-sm italic leading-7 text-blue-100 sm:text-base md:text-lg md:leading-8">
             "Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over, shall men give into your bosom. For with the same measure that ye mete withal it shall be measured to you again." 
             <span className="mt-3 block text-sm font-bold not-italic tracking-wide text-amber-300">— Luke 6:38</span>
          </p>
        </div>
      </header>

      {/* ---------- Form (overlaps the hero) ---------- */}
      <main className="relative z-10 mx-auto -mt-20 w-full max-w-xl px-4 pb-16 sm:-mt-28 sm:px-6 sm:pb-20">
        <GiveForm />
      </main>
    </div>
  );
};

export default Give;
