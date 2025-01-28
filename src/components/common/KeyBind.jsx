import React from 'react';

const KeyBind = ({ children }) => (
    <span className="border-2 border-gray-900 text-sm bg-white rounded-[4px] px-2.5 py-1 font-bold shadow-[0_3px_0_rgba(0,0,0,0.9)] group-hover:shadow-[0_4px_0_rgba(0,0,0,0.9)] group-active:shadow-[0_1px_0_rgba(0,0,0,0.9)] transition-all duration-150">
        {children}
    </span>
);

export default KeyBind;
