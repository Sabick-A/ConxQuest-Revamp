import React from 'react';

const ProgressNotification = ({ startValue, endValue, onComplete }) => {
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-progress-slide w-96">
      <div className="bg-[rgba(5,46,22,0.4)] backdrop-blur-lg rounded-2xl p-1.5 shadow-[0_0_30px_rgba(34,197,94,0.15)] border border-[rgba(34,197,94,0.2)]">
        <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-sm rounded-xl px-6 py-4 shine-effect border border-[rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(34,197,94,0.2)] backdrop-blur-sm flex items-center justify-center border border-[rgba(34,197,94,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[rgba(255,255,255,0.9)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[rgba(255,255,255,0.95)]">Progress Increased!</h3>
              <div className="flex items-center gap-2">
                <span className="text-[rgba(255,255,255,0.8)] font-bold animate-progress-number">{startValue}%</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[rgba(34,197,94,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-[rgba(34,197,94,0.9)] font-bold animate-pulse">{endValue}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressNotification; 