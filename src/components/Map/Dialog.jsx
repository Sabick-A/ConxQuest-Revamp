import React, { useState, useEffect } from 'react';
import KeyBind from '../common/KeyBind';

// Dialog data for each NPC
const dialogData = {
  1: {
    positions: {
      npc: { x: 225, y: -225 },    // NPC dialog appears on the right
      player: { x: -225, y: -225 }  // Player dialog appears on the left
    },
    dialogs: [
        { speaker: 'npc', text: "Welcome to ConxQuest! I'm here to guide you on an exciting journey through the Constitution." },
        { speaker: 'player', text: "That sounds great! I'm eager to learn." },
        { speaker: 'npc', text: <>Awesome! Press <span className="inline-block mx-1 mb-1"><KeyBind>G</KeyBind></span> to open the guide and explore interactive activities and games.</>}
      ]
  },
  2: {
    positions: {
      npc: { x: 500, y: 0 },    // NPC dialog appears on the right
      player: { x: -500, y: 0 }  // Player dialog appears on the left
    },
    dialogs: [
      { speaker: 'npc', text: "Hey there! Want to learn about the Bill of Rights?" },
      { speaker: 'player', text: "Yes, please tell me more!" },
      { speaker: 'npc', text: "The Bill of Rights consists of the first 10 amendments to the Constitution..." }
    ]
  }
  // Add more dialog sets for other NPCs
};

function Dialog({ npcId, onClose }) {
  const [currentDialog, setCurrentDialog] = useState(0);
  const npcData = dialogData[npcId] || { 
    positions: { 
      npc: { x: 500, y: 0 }, 
      player: { x: -500, y: 0 } 
    }, 
    dialogs: [] 
  };
  const { positions, dialogs } = npcData;

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Progress dialog on any key press
      if (currentDialog < dialogs.length - 1) {
        setCurrentDialog(prev => prev + 1);
      } else {
        setCurrentDialog(0); 
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentDialog, dialogs.length, onClose]);

  if (!dialogs.length) {
    console.log('No dialogs found for NPC:', npcId);
    return null;
  }

  const currentMessage = dialogs[currentDialog];
  const isPlayer = currentMessage.speaker === 'player';
  const offset = isPlayer ? positions.player : positions.npc;


  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] w-screen h-screen flex justify-center items-center">
      <div 
        className={`
          absolute bg-whitesmoke/95 border-2 border-green-400 rounded-xl p-5
          font-game text-xs leading-6 max-w-[400px] min-w-[300px]
          backdrop-blur-md shadow-[0_0_20px_rgba(74,222,128,0.15)]
          pointer-events-auto animate-dialogPopIn
          before:content-[''] before:absolute before:-bottom-[10px] 
          ${isPlayer 
            ? 'before:left-[80%] bg-gradient-to-br from-whitesmoke/95 to-gray-200/95' 
            : 'before:left-[20%] bg-gradient-to-br from-whitesmoke/95 to-gray-200/95'
          }
          before:transform before:-translate-x-1/2
          before:border-x-[10px] before:border-x-transparent
          before:border-t-[10px] before:border-t-green-400
          translate-y-[-50%]
          relative
          after:absolute after:inset-[1px] after:rounded-[10px]
          after:border after:border-green-400/20
          hover:shadow-[0_0_25px_rgba(74,222,128,0.2)]
          transition-shadow duration-300
        `}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`
        }}
      >
        <div className={`relative z-10 ${isPlayer ? 'text-gray-800' : 'text-gray-800'}`}>
          <div className="text-[10px] mb-3 opacity-90 font-bold tracking-wider text-green-600">
            {isPlayer ? 'YOU' : 'NPC'}:
          </div>
          <div className="px-1 leading-relaxed tracking-wide">
            {currentMessage.text}
          </div>
        </div>
        <div 
          className={`
            mt-4 text-right text-[10px] animate-blink relative z-10
            ${isPlayer ? 'text-green-600' : 'text-green-700'}
            tracking-wider font-bold
          `}
        >
          Press any key to continue
        </div>
      </div>
    </div>
  );
}

export default Dialog; 