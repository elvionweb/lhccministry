// src/pages/Give.jsx
import React from 'react';
import GiveForm from "../components/gives/GiveForm";

const Give = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-blue-700 mb-4 tracking-tighter">
            Pay your offerings, tithes and special seed
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto leading-relaxed">
             "Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over, shall men give into your bosom. For with the same measure that ye mete withal it shall be measured to you again." 
             <span className="block font-bold text-gray-400 mt-2">— Luke 6:38</span>
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-xl mx-auto">
          <GiveForm />
        </div>
      </div>
    </div>
  );
};

export default Give;