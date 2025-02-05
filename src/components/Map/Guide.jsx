import React, { useEffect } from "react";
import KeyBind from "../common/KeyBind";
import { genieImage, npcImage, resourceImage, cardGameImage } from "../../assets/images/Map";

const Guide = ({ onClose }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      onClose();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onClose]);

  const guideItems = [
    {
      image: genieImage.src,
      title: "Genie, The Chatbot",
      description:
        "Engage with the Fountain to summon your AI Genie, ready to assist with any questions you have!",
    },
    {
      image: npcImage.src,
      title: "Non-Player Characters (NPCs)",
      description:
        "Interact with NPCs to unlock exclusive quests, receive helpful hints, and enjoy some casual conversation.",
    },
    {
      image: resourceImage.src,
      title: "Knowledge Book",
      description:
        "Engage with the Knowledge Book to acquire the insights needed to advance to the next level.",
    },
    {
      image: cardGameImage.src,
      title: "Card Quest",
      description:
        "Engage with the Card Game to test your knowledge and skills.",
    },
  ];

  return (
    <div className="fixed inset-0 bg-blackw bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-whitesmoke p-8 rounded-2xl  max-w-[95vw] h-[800px] max-h-[95vh] relative border-2 border-green-700 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-green-700 border-opacity-30">
          <h2 className="text-2xl text-green-700 font-game tracking-wider">
            GAME GUIDE
          </h2>
          <div className="flex items-center gap-2 text-green-700">
            <span className="text-sm">Close:</span>
            <KeyBind>Any</KeyBind>
          </div>
        </div>

        {/* Guide Container */}
        <div className="h-[calc(100%-7rem)] overflow-auto pr-4 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guideItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#2a7299] bg-opacity-10 p-4 rounded-lg border-2 border-green-700 border-opacity-30 hover:border-opacity-50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-28 h-28 bg-green-700 bg-opacity-20 rounded-lg p-2 group-hover:bg-opacity-30 transition-all duration-300">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain pixelated"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm text-green-700 font-game mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-2 border-t-2 border-green-700 font-bold border-opacity-30 text-center text-sm">
          <div className="text-gray-600">Press any key to close</div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
