import React from 'react';
import logo2 from "../../assets/images/common/logo2.png";

function InitialLoader({ transparent = false }) {
  return (
    <div className={`w-full h-screen flex items-center justify-center relative overflow-hidden ${transparent ? 'bg-transparent' : 'bg-[rgb(5,46,22)]'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: transparent ? `
              radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.2) 1px, transparent 0),
              linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%)
            ` : `
              radial-gradient(circle at 2px 2px, rgba(74, 222, 128, 0.2) 1px, transparent 0),
              linear-gradient(45deg, rgba(74, 222, 128, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(74, 222, 128, 0.1) 25%, transparent 25%)
            `,
            backgroundSize: '24px 24px, 60px 60px, 60px 60px'
          }}
        />
      </div>

      {/* Loading Animation */}
      <div className="relative flex flex-col items-center gap-12">
        {/* Logo Container */}
        <div className="relative">
          {/* Glowing rings */}
          <div className={`absolute -inset-8 border-2 ${transparent ? 'border-white/10' : 'border-green-400/10'} rounded-full animate-[spin_8s_linear_infinite]`} />
          <div className={`absolute -inset-6 border-2 ${transparent ? 'border-white/15' : 'border-green-400/15'} rounded-full animate-[spin_6s_linear_infinite_reverse]`} />
          <div className={`absolute -inset-4 border-2 ${transparent ? 'border-white/20' : 'border-green-400/20'} rounded-full animate-[spin_4s_linear_infinite]`} />
          
          {/* Logo with glow effect */}
          <div className="relative transform hover:scale-105 transition-transform duration-300">
            <div className={`absolute inset-0 blur-md ${transparent ? 'bg-white/30' : 'bg-green-400/30'} rounded-full animate-[pulse_2s_ease-in-out_infinite]`} />
            <img 
              src={logo2} 
              alt="ConxQuest" 
              className={`w-48 h-auto relative z-10 ${transparent ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]'}`}
            />
          </div>
        </div>

        {/* Loading Bar */}
        <div className="relative w-48 h-2">
          <div className={`absolute inset-0 ${transparent ? 'bg-white/20' : 'bg-green-400/20'} rounded-full overflow-hidden backdrop-blur-sm`}>
            <div className={`h-full w-1/3 bg-gradient-to-r from-transparent ${transparent ? 'via-white' : 'via-green-400'} to-transparent animate-[loading_1.5s_ease-in-out_infinite]`} />
          </div>
          <div className={`absolute inset-0 border ${transparent ? 'border-white/30' : 'border-green-400/30'} rounded-full`} />
        </div>

        {/* Loading Text */}
        <div className={`${transparent ? 'text-white' : 'text-green-400'} font-game text-lg relative group`}>
          {/* Text glow effect */}
          <div className={`absolute -inset-1 ${transparent ? 'bg-white/5' : 'bg-green-400/5'} blur-sm rounded-lg ${transparent ? 'group-hover:bg-white/10' : 'group-hover:bg-green-400/10'} transition-colors duration-300`} />
          <div className="relative">
            {(transparent ? ["R", "e", "t", "u", "r", "n", "i", "n", "g", " ", "H", "o", "m", "e", ".", ".", "."] : 
              ["L", "o", "a", "d", "i", "n", "g", ".", ".", "."]).map((char, i) => (
              <span 
                key={i}
                className="inline-block animate-[bounce_1s_ease-in-out_infinite]"
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  textShadow: transparent ? '0 0 10px rgba(255, 255, 255, 0.5)' : '0 0 10px rgba(74, 222, 128, 0.5)'
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative particles */}
        <div className="absolute inset-[-150px] opacity-30">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${i % 2 === 0 ? 'w-1 h-1' : 'w-2 h-2'} 
                         ${transparent ? (i % 3 === 0 ? 'bg-white' : 'bg-white/80') : (i % 3 === 0 ? 'bg-green-400' : 'bg-green-300')}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
                opacity: 0.3 + Math.random() * 0.7
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(180deg); }
        }

        @keyframes loading {
          0% { transform: translateX(-200%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
      `}</style>
    </div>
  );
}

export default InitialLoader; 