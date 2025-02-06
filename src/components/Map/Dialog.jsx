import React, { useState, useEffect } from 'react';
import KeyBind from '../common/KeyBind';

const dialogData = {
  1: {
    positions: {
      npc: { x: 185, y: -225 },  
      player: { x: -140, y: -190 }  
    },
    dialogs: [
        { speaker: 'npc', text: "Welcome to ConxQuest! I'm here to guide you on an exciting journey through the Constitution." },
        { speaker: 'player', text: "That sounds great! I'm eager to learn." },
        { speaker: 'npc', text: <>Awesome! Press <span className="inline-block mx-1 mb-1"><KeyBind>G</KeyBind></span> to open the guide and explore interactive activities and games.</>}
      ]
  },
  2: {
    positions: {
      npc: { x: 190, y: -230 },    
      player: { x: -140, y: -200 }  
    },
    dialogs: [
      { speaker: 'npc', text: "Halt! You must complete all games in this level before you can proceed to the next island. The knowledge from these games is essential for your journey." },
      { speaker: 'player', text: "Oh no! But why can’t I just move ahead?" },
      { speaker: 'npc', text: "Because each game teaches you something important. Skipping them would mean missing out on crucial knowledge!" },
      { speaker: 'player', text: "Alright, I get it. I’ll make sure to complete them all before moving forward!" },
      { speaker: 'npc', text: "That’s the spirit! Master the challenges, and you’ll be ready for what lies ahead." }
    ]
  },
  3: {
    positions: {
      npc: { x: -225, y: -200 },  
      player: { x: 100, y: -200 } 
    },
    dialogs: [
      { speaker: 'npc', text: "Did you know? The Preamble is often referred to as the 'Mini-Constitution' because it summarises the essence of the entire document." },
      { speaker: 'player', text: "Wow, I didn’t know that! So it’s like a sneak peek into what the Constitution stands for?" },
      { speaker: 'npc', text: "Exactly! It lays out the core values and principles our nation is built upon." },
      { speaker: 'player', text: "That’s really cool! I should probably read it carefully." },
      { speaker: 'npc', text: "Absolutely! Understanding it will give you great insights into our nation's foundation." }
    ]
  },
  4: {
    positions: {
      npc: { x: 100, y: -280 },    
      player: { x: -150, y: -190 }  
    },
    dialogs: [
      { speaker: 'npc', text: "Ah, a curious traveler! Welcome to this land of knowledge. Are you ready to uncover the wisdom of the Constitution?" },
      { speaker: 'player', text: "Absolutely! I want to learn as much as I can." },
      { speaker: 'npc', text: "Excellent! Let’s start with a question. Do you know what the Constitution is primarily designed to do?" },
      { speaker: 'player', text: "Hmm… I think it sets the rules for the country, right?" },
      { speaker: 'npc', text: "Correct! It defines the principles of governance, the rights of citizens, and the duties of the state." },
      { speaker: 'player', text: "That’s interesting! So it’s like the ultimate guidebook for the nation?" },
      { speaker: 'npc', text: "Exactly! And every citizen should understand it. Keep exploring, and you’ll uncover even more fascinating details!" }
    ]
  },

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
  const isRight=(isPlayer)?positions.player.x<0:positions.npc.x<0;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] w-screen h-screen flex justify-center items-center">
      <div 
        className={`
          absolute bg-whitesmoke/95 border-2 border-green-400 rounded-xl p-5
          font-game text-xs leading-6 max-w-[400px] min-w-[300px]
          backdrop-blur-md shadow-[0_0_20px_rgba(74,222,128,0.15)]
          pointer-events-auto animate-dialogPopIn
          before:content-[''] before:absolute before:-bottom-[10px] 
          ${isRight 
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