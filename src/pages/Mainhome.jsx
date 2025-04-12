import React from "react";

const Mainhome = () => {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex flex-col items-center pt-20 px-4 pb-10 text-white">
      <div className="text-center max-w-xl w-full">
        <h1 className="text-5xl font-extrabold mb-6 animate-pulse tracking-wide">
          🌟 Welcome to SafeSpace
        </h1>

        {/* Call Section */}
        
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl mb-8 hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-2">
          🎧 Listener
          </h2>
          <p className="text-lg">
            Talk to a listener. We're here to help, anytime.
          </p>
        </div>

        {/* Chat Section */}
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl mb-8 hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-2">
          📞 Call
          </h2>
          <p className="text-lg">
            Randomly connect with any user through call.
          </p>
        </div>

        {/* Listener Section */}
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-2">
          💬 Chat 
          </h2>
          <p className="text-lg">
              safe place for open dialog.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mainhome;
